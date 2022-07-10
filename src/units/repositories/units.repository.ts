import {EntityRepository, TreeRepository} from "typeorm";
import {Unit} from "../unit.entity";
import {GetUnitsFilterDto} from "../dto/get-units-filter.dto";
import {NotFoundException} from "@nestjs/common";
import {User} from '../../users/models/user.entity';


@EntityRepository(Unit)
export class UnitsRepository extends TreeRepository<Unit> {

    async getUnitById(id: number): Promise<Unit> {
        const found = await this.findOne({where: {id}});
        if (!found) {
            throw new NotFoundException(`Unit with ID ${id} not found! `);
        }
        return found;
    }

    async getUnitByIdWithUsers(idUnit: number): Promise<Unit> {
        const query = await this.createQueryBuilder('unit');

        query.leftJoinAndSelect('unit.users', 'users')
            .select(['unit.id', 'unit.name', 'users.id','users.name', 'users.surname'])
            .where('unit.id = :idUnit', {idUnit});
        const found = query.getOne();

        if (!found) {
            throw new NotFoundException(`Unit with users that have id "${idUnit}" not found! `);
        }

        return found;
    }

    async getAncestors(unitId: number): Promise<any> {
        const unit = await this.getUnitById(unitId);
        // return await this.findAncestorsTree(unit);
        return await this.findAncestors(unit);
    }

    async getUnits(getUnitsFilterDto?: GetUnitsFilterDto, user?: User): Promise<Unit[]> {
        let parent;
        let units;

        if (getUnitsFilterDto) {
            parent = getUnitsFilterDto.parent;
        }

        if (user && user.unit) {
           parent = user.unit.id
        }

        if (parent) {
            const ancestor = await this.getUnitById(parent);
            units = await this.findDescendantsTree(ancestor);
        } else {
            units = await this.findTrees();
        }
        return units;
    }

}

import {
  ConflictException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { Unit } from './unit.entity';
import { GetUnitsFilterDto } from './dto/get-units-filter.dto';
import { User } from '../users/models/user.entity';
import { UsersService } from '../users/users.service';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, TreeRepository } from 'typeorm';

@Injectable()
export class UnitsService {
  private unitsRepository: TreeRepository<Unit>;

  constructor(
    @InjectEntityManager()
    private manager: EntityManager,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {
    this.unitsRepository = this.manager.getTreeRepository(Unit);
  }

  async listUnits(
    getUnitsFilterDto: GetUnitsFilterDto,
    user: User,
  ): Promise<Unit[]> {
    return await this.getUnits(getUnitsFilterDto, user);
  }

  async getUnits(
    getUnitsFilterDto?: GetUnitsFilterDto,
    user?: User,
  ): Promise<Unit[]> {
    let parent;
    let units;

    if (getUnitsFilterDto) {
      parent = getUnitsFilterDto.parent;
    }

    if (user && user.unit) {
      parent = user.unit.id;
    }

    if (parent) {
      const ancestor = await this.getUnitById(parent);
      units = await this.unitsRepository.findDescendantsTree(ancestor);
    } else {
      units = await this.unitsRepository.findTrees();
    }
    return units;
  }

  async getUnitByIdWithUsers(idUnit: number): Promise<Unit> {
    const query = await this.unitsRepository.createQueryBuilder('unit');

    query
      .leftJoinAndSelect('unit.users', 'users')
      .select([
        'unit.id',
        'unit.name',
        'users.id',
        'users.name',
        'users.surname',
      ])
      .where('unit.id = :idUnit', { idUnit });
    const found = query.getOne();

    if (!found) {
      throw new NotFoundException(
        `Unit with users that have id "${idUnit}" not found! `,
      );
    }

    return found;
  }

  async getUnitById(id: number, withUsers?: boolean): Promise<Unit> {
    let found;

    if (!withUsers) {
      found = await this.unitsRepository.findOne({ where: { id: id } });
    } else {
      found = await this.getUnitByIdWithUsers(id);
      if (found && found.users === undefined) {
        found.users = [];
      }
    }

    if (!found) {
      throw new NotFoundException(`Unit with ID "${id}" not found!`);
    }

    return found;
  }

  /**
   * fce pro hledani jednotky ktera je na nejvyssi urovni (ma parent null a je soucasti stromu)
   * @param id
   * @return unit
   */
  async getMasterUnit(id: number): Promise<Unit> {
    const unit = await this.getUnitById(id);
    const roots = await this.unitsRepository.findAncestors(unit);

    if (roots.length === 0) return unit;

    return roots.shift();
  }

  /**
   * vytvorit jednotku, pokud je zaslan i @parent tak se kontroluje zda existuje
   * @param createUnitDto
   * @param user
   * @return unit
   */
  async createUnit(createUnitDto: CreateUnitDto, user: User): Promise<Unit> {
    let parent;
    if (createUnitDto.parent) {
      parent = await this.unitsRepository.findOne({
        where: { id: createUnitDto.parent },
      });

      if (!parent) {
        throw new NotFoundException(
          `Parent with ID "${createUnitDto.parent}" not found! `,
        );
      }
    }

    const nameExists = await this.unitsRepository.findOne({
      where: { name: createUnitDto.name },
    });

    if (nameExists) {
      throw new ConflictException(
        `Unit with "${createUnitDto.name}" already exists!`,
      );
    }

    const unit = new Unit();
    unit.name = createUnitDto.name;
    unit.parent = parent;
    unit.users = [];

    if (unit.parent === undefined) {
      unit.users.push(user);
    }

    await unit.save();

    const validInformation = ['username'];
    unit.users.map((user) => {
      Object.keys(user).forEach((key) => {
        if (!validInformation.includes(key)) delete user[key];
      });
    });
    delete unit.users;
    return unit;
  }

  /**
   * mazani jednotky
   * @param id
   * @param user
   */
  async deleteUnit(id: number, user: User): Promise<void> {
    const isInTree = await this.isManagerInTree(id, user);

    if (!isInTree) {
      throw new ForbiddenException('You are not able to do that!');
    }

    if (await this.haveUnitUser(id)) {
      throw new ForbiddenException('Unit have users');
    }

    const unit = await this.getUnitById(id);

    const children: Unit[] = await this.unitsRepository.findDescendants(unit);

    /**
     * prvne musim odstranit zavislosti
     */
    const query = await this.unitsRepository.createDescendantsQueryBuilder(
      'unit',
      'unitClosure',
      unit,
    );
    if (children.length < 1) {
      children.push(unit);
    }

    query
      .delete()
      .from('unit_closure')
      .where('id_descendant IN (:...ids)', { ids: children.map((ch) => ch.id) })
      .execute()
      .catch((err) => console.log(err));

    await this.unitsRepository.remove(children.reverse());

    return;
  }

  /**
   * funkce kontroluje zda uzivatel ma prava k sekci, resp zda je ve stromove strukture v teto ci v nadrazene jednotce
   * @param unitId
   * @param user
   * @return Promise<boolean>
   */
  async isManagerInTree(unitId: number, user: User): Promise<boolean> {
    if (user.unit === null) {
      return true;
    }
    const unitsTreeParentObject = await this.getAncestors(unitId);
    return unitsTreeParentObject.some((unit) => unit.id === user.unit?.id);
  }

  async getAncestors(unitId: number): Promise<any> {
    const unit = await this.getUnitById(unitId);
    return await this.unitsRepository.findAncestors(unit);
  }

  /**
   * prirazeni manazera jednotce
   * @param idUnit
   * @param idUser
   * @param user
   */
  async addManager(idUnit: number, idUser: number, user: User): Promise<void> {
    const unit = await this.getUnitById(idUnit, true);
    const isInTree = await this.isManagerInTree(idUnit, user);
    const userToAdd = await this.usersService.getUserById(idUser);

    if (!isInTree) {
      throw new ForbiddenException(
        'You are not able to add manager for this unit',
      );
    }

    /**
     * pokud je uzivatel jiz prirazen
     */
    if (unit.users.find((u) => u.id === idUser)) {
      throw new ConflictException(
        `User ID "${idUser}" already exists on unit ID "${idUnit}" `,
      );
    }

    //TODO: nemel by uzivatel dostat i nejaka zakladni prava?

    unit.users.push(userToAdd);
    await unit.save();

    return;
  }

  /**
   * odebirani uzivatelu z jednotky
   * @param idUnit
   * @param idUser
   * @param user
   */
  async removeManager(idUnit: number, idUser: number, user: User) {
    const unit = await this.getUnitById(idUnit, true);
    const isInTree = await this.isManagerInTree(idUnit, user);

    if (!isInTree) {
      throw new ForbiddenException('You are not able to this action!');
    }

    unit.users = unit.users.filter((u) => u.id !== idUser);
    await unit.save();

    return;
  }

  async updateUnit(
    id: number,
    updateUnitDto: UpdateUnitDto,
    user: User,
  ): Promise<Unit> {
    if (!(await this.isManagerInTree(id, user))) {
      throw new ForbiddenException('You are not able to perform this action');
    }
    const unit = await this.getUnitById(id);

    try {
      unit.name = updateUnitDto.name;
      await unit.save();
    } catch (e) {
      throw new InternalServerErrorException('Problem with update');
    }
    return unit;
  }

  async getDescendants(parent: Unit): Promise<Unit[]> {
    return await this.unitsRepository.findDescendants(parent);
  }

  async getDescendantsById(parentId: number): Promise<Unit[]> {
    const unit = await this.getUnitById(parentId);
    return this.getDescendants(unit);
  }

  async getAllUnits(): Promise<Unit[]> {
    return await this.unitsRepository.findTrees();
  }

  async haveUnitUser(unitId: number): Promise<boolean> {
    const descendants = await this.getDescendantsById(unitId);
    const have = !!(
      await Promise.all([
        ...descendants.map((d) => this.usersService.getUsers({ unitId: d.id })),
      ])
    )
      .map((d) => d.length)
      ?.some((d) => d > 0);
    return have;
  }

  async ableToDelete(id: number): Promise<boolean> {
    const haveUser = await this.haveUnitUser(id);
    return !haveUser;
  }

  async getMasterUnitByUser(user: User): Promise<Unit> {
    return this.getMasterUnit(user.unit.id);
  }
}

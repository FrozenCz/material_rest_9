import {ForbiddenException, Injectable, NotFoundException} from "@nestjs/common";
import {LocationsRepository} from "./repositories/locations.repository";
import {Location} from "./models/location.entity";
import {CreateLocationDto} from "./dto/create-location.dto";
import {UnitsService} from '../units/units.service';
import {User} from '../users/models/user.entity';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class LocationsService {

    constructor(
        private locationsRepository: LocationsRepository,
        private readonly unitsService: UnitsService) {
    }

    async getLocationById(id: number): Promise<Location> {
        const found = this.locationsRepository.findOne({where: {id}});
        if (!found) {
            throw new NotFoundException(`Location with ID "${id}" not found!`);
        }
        return found;
    }

    async listLocations(): Promise<Location[]> {
        return this.locationsRepository.listLocations();
    }

    /**
     * vytvori lokaci
     * @param createLocationDto
     * @param user
     */
    async createLocation(createLocationDto: CreateLocationDto, user: User): Promise<Location> {
        let parentLocation;
        let unitScopeMasterUnit;
        const {name, masterUnit, parent = null} = createLocationDto || {};

        if (!user.unit?.id) {
            throw new ForbiddenException(`You need to be settled to any unit!`);
        }

        if (parent) {
            parentLocation = await this.getLocationById(parent);
            if (!parentLocation) {
                throw new NotFoundException(`Location with ID "${parent}" not found! `);
            }
            unitScopeMasterUnit = await this.unitsService.getMasterUnit(parentLocation.masterUnit);
        } else {
            unitScopeMasterUnit = await this.unitsService.getMasterUnit(masterUnit);
        }

        const userScopeMasterUnit = await this.unitsService.getMasterUnit(user.unit.id);

        if (userScopeMasterUnit !== unitScopeMasterUnit) {
            throw new ForbiddenException(`You are not able to set unit under "${unitScopeMasterUnit}" master unit `);

        }

        const location = new Location();
        location.name = name;
        location.parent = parentLocation;
        location.masterUnit = unitScopeMasterUnit;
        return await location.save();
    }

    async deleteLocation(id: number): Promise<void> {
        const location = await this.getLocationById(id);
        // todo: kontrola zda lokace nejsou obsazene v nejakych majetkach? i ty pod?
        return this.locationsRepository.deleteLocation(location);
    }
}

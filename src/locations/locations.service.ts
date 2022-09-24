import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Location } from './models/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UnitsService } from '../units/units.service';
import { User } from '../users/models/user.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, TreeRepository } from 'typeorm';

@Injectable()
export class LocationsService {
  private locationsRepository: TreeRepository<Location>;

  constructor(
    @InjectEntityManager()
    private manager: EntityManager,
    private readonly unitsService: UnitsService,
  ) {
    this.locationsRepository = this.manager.getTreeRepository(Location);
  }

  async getLocationById(id: string): Promise<Location> {
    const found = this.locationsRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Location with ID "${id}" not found!`);
    }
    return found;
  }

  async listLocations(): Promise<Location[]> {
    return await this.locationsRepository.findTrees();
  }

  /**
   * vytvori lokaci
   * @param createLocationDto
   * @param user
   */
  async createLocation(
    createLocationDto: CreateLocationDto,
    user: User,
  ): Promise<Location> {
    let parentLocation;
    let unitScopeMasterUnit;
    const { name, parent = null } = createLocationDto || {};

    if (!user.unit?.id) {
      throw new ForbiddenException(`You need to be settled to any unit!`);
    }

    if (parent) {
      parentLocation = await this.getLocationById(parent);
      if (!parentLocation) {
        throw new NotFoundException(`Location with ID "${parent}" not found! `);
      }
      unitScopeMasterUnit = await this.unitsService.getMasterUnit(
        parentLocation.masterUnit,
      );
    } else {
      // unitScopeMasterUnit = await this.unitsService.getMasterUnit(masterUnit);
      unitScopeMasterUnit = await this.unitsService.getMasterUnitByUser(user);
    }

    const userScopeMasterUnit = await this.unitsService.getMasterUnit(
      user.unit.id,
    );

    if (userScopeMasterUnit.id !== unitScopeMasterUnit.id) {
      throw new ForbiddenException(
        `You are not able to set unit under "${unitScopeMasterUnit}" master unit `,
      );
    }

    const location = new Location();
    location.name = name;
    location.parent = parentLocation;
    location.masterUnit = unitScopeMasterUnit;
    return await location.save();
  }

  async deleteLocation(id: string): Promise<void> {
    const location = await this.getLocationById(id);
    // todo: kontrola zda lokace nejsou obsazene v nejakych majetkach? i ty pod?

    const children = await this.locationsRepository.findDescendants(location);
    /**
     * prvne musim odstranit zavislosti
     */
    const query = await this.locationsRepository.createDescendantsQueryBuilder(
      'location',
      'locationClosure',
      location,
    );

    await query
      .delete()
      .from('location_closure')
      .where('id_ancestor IN (:...ids)', { ids: children.map((ch) => ch.id) })
      .execute();

    await this.locationsRepository.remove(children.reverse());
  }
}

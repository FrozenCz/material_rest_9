import { Injectable } from '@nestjs/common';
import { LocationsService } from '../locations/locations.service';
import { Location } from '../locations/models/location.entity';
import { CreateLocationDto, UpdateLocation } from "../locations/dto/create-location.dto";
import { User } from '../users/models/user.entity';

@Injectable()
export class LocationFacade {
  constructor(private locationService: LocationsService) {}

  getLocations(): Promise<Location[]> {
    return this.locationService.listLocations();
  }

  createLocation(
    createLocationDto: CreateLocationDto,
    user: User,
  ): Promise<Location> {
    return this.locationService.createLocation(createLocationDto, user);
  }

  deleteLocation(id: string) {
    return this.locationService.deleteLocation(id);
  }

  updateLocation(updateLocation: UpdateLocation, user: User) {
    return this.locationService.updateLocation(updateLocation, user);
  }
}

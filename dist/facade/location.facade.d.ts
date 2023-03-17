import { LocationsService } from '../locations/locations.service';
import { Location } from '../locations/models/location.entity';
import { CreateLocationDto, SaveNfcDTO, UpdateLocation } from "../locations/dto/create-location.dto";
import { User } from '../users/models/user.entity';
export declare class LocationFacade {
    private locationService;
    constructor(locationService: LocationsService);
    getLocations(): Promise<Location[]>;
    createLocation(createLocationDto: CreateLocationDto, user: User): Promise<Location>;
    deleteLocation(id: string): Promise<void>;
    updateLocation(updateLocation: UpdateLocation, user: User): Promise<Location>;
    safeNfcId(locationUuid: string, saveNfcId: SaveNfcDTO): Promise<Location>;
}

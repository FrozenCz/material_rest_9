import { Location } from './models/location.entity';
import { CreateLocationDto, SaveNfcDTO, UpdateLocation } from './dto/create-location.dto';
import { UnitsService } from '../units/units.service';
import { User } from '../users/models/user.entity';
import { EntityManager } from 'typeorm';
export declare class LocationsService {
    private manager;
    private readonly unitsService;
    private locationsRepository;
    constructor(manager: EntityManager, unitsService: UnitsService);
    getLocationById(id: string): Promise<Location>;
    listLocations(): Promise<Location[]>;
    createLocation(createLocationDto: CreateLocationDto, user: User): Promise<Location>;
    deleteLocation(id: string): Promise<void>;
    updateLocation(updateLocation: UpdateLocation, user: User): Promise<Location>;
    safeNfcId(locationUuid: string, saveNfcId: SaveNfcDTO, user: User): Promise<Location>;
}

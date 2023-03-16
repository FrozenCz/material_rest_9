import { Location } from './models/location.entity';
import { CreateLocationDto, SaveNfcDTO, UpdateLocationDto } from './dto/create-location.dto';
import { User } from '../users/models/user.entity';
import { Api } from '../api';
export declare class LocationsController {
    private api;
    constructor(api: Api);
    getLocations(): Promise<Location[]>;
    createLocation(user: User, createLocationDto: CreateLocationDto): Promise<Location>;
    updateLocation(user: User, updateLocation: UpdateLocationDto, uuid: string): Promise<Location>;
    saveNfcId(user: User, saveNfcId: SaveNfcDTO, locationUuid: string): Promise<Location>;
    deleteLocation(id: string): Promise<void>;
}

import { CreateUnitDto } from './dto/create-unit.dto';
import { UnitsService } from './units.service';
import { Unit } from './unit.entity';
import { GetUnitsFilterDto } from './dto/get-units-filter.dto';
import { User } from '../users/models/user.entity';
import { UpdateUnitDto } from './dto/update-unit.dto';
export declare class UnitsController {
    private unitsService;
    constructor(unitsService: UnitsService);
    listUnits(getUnitsFilterDto: GetUnitsFilterDto, user: User): Promise<Unit[]>;
    getAllUnits(user: User): Promise<Unit[]>;
    getUnit(id: number): Promise<Unit>;
    getMasterUnit(id: number): Promise<Unit>;
    createUnit(createUnitDto: CreateUnitDto, user: User): Promise<Unit>;
    editUnit(id: number, updateUnitDto: UpdateUnitDto, user: User): Promise<Unit>;
    deleteUnit(id: number, user: User): Promise<void>;
    ableToDelete(id: number, user: User): Promise<boolean>;
    addManager(idUnit: number, idUser: number, user: User): Promise<void>;
    removeManager(idUnit: number, idUser: number, user: User): Promise<void>;
    getDescendantsById(idUnit: number): Promise<Unit[]>;
}

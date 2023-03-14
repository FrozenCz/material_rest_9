import { CreateUnitDto } from './dto/create-unit.dto';
import { Unit } from './unit.entity';
import { GetUnitsFilterDto } from './dto/get-units-filter.dto';
import { User } from '../users/models/user.entity';
import { UsersService } from '../users/users.service';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { EntityManager } from 'typeorm';
export declare class UnitsService {
    private manager;
    private usersService;
    private unitsRepository;
    constructor(manager: EntityManager, usersService: UsersService);
    listUnits(getUnitsFilterDto: GetUnitsFilterDto, user: User): Promise<Unit[]>;
    getUnits(getUnitsFilterDto?: GetUnitsFilterDto, user?: User): Promise<Unit[]>;
    getUnitByIdWithUsers(idUnit: number): Promise<Unit>;
    getUnitById(id: number, withUsers?: boolean): Promise<Unit>;
    getMasterUnit(id: number): Promise<Unit>;
    createUnit(createUnitDto: CreateUnitDto, user: User): Promise<Unit>;
    deleteUnit(id: number, user: User): Promise<void>;
    isManagerInTree(unitId: number, user: User): Promise<boolean>;
    getAncestors(unitId: number): Promise<any>;
    addManager(idUnit: number, idUser: number, user: User): Promise<void>;
    removeManager(idUnit: number, idUser: number, user: User): Promise<void>;
    updateUnit(id: number, updateUnitDto: UpdateUnitDto, user: User): Promise<Unit>;
    getDescendants(parent: Unit): Promise<Unit[]>;
    getDescendantsById(parentId: number): Promise<Unit[]>;
    getAllUnits(): Promise<Unit[]>;
    haveUnitUser(unitId: number): Promise<boolean>;
    ableToDelete(id: number): Promise<boolean>;
    getMasterUnitByUser(user: User): Promise<Unit>;
}
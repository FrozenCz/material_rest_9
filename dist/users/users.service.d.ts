import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.entity';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UnitsService } from '../units/units.service';
import { SetUserRightsDto } from './dto/set-user-rights.dto';
import { RightsService } from './rights.service';
import { Rights } from './models/rights.entity';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Unit } from '../units/unit.entity';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepository;
    private unitsService;
    private rightsService;
    constructor(userRepository: Repository<User>, unitsService: UnitsService, rightsService: RightsService);
    private inScope;
    countUsers(): Promise<number>;
    createUser(createUserDto: CreateUserDto, creator: User, skipCheck?: boolean): Promise<User>;
    getUserById(userId: number): Promise<User>;
    getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<User[]>;
    updateUser(id: number, updateUserDto: UpdateUserDto, user: User): Promise<User>;
    deleteUser(userToDelete: User, user: User): Promise<User>;
    setUsersRights(userId: number, setUserRightsDto: SetUserRightsDto, user: User): Promise<Rights[]>;
    updateUsersUnits(updateUsersDto: UpdateUsersDto, user: User): Promise<User[]>;
    getUnitByUserUnitId(user: User): Promise<Unit>;
    getReachableUsers(user: User): Promise<User[]>;
    getReachableUser(userId: number, user: User): Promise<User>;
    validateUser(authCredentialsDto: AuthCredentialsDto): Promise<User>;
    private hashPasword;
}
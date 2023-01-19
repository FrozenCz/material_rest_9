import { User } from './models/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SetUserRightsDto } from './dto/set-user-rights.dto';
import { Rights } from './models/rights.entity';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Api } from 'src/api';
import { UserOutDto } from "./dto/out/User.out.dto";
export declare class UsersController {
    private api;
    constructor(api: Api);
    createUser(user: User, createUserDto: CreateUserDto): Promise<User>;
    getUsers(user: User, getUsersFilterDto: GetUsersFilterDto): Promise<UserOutDto[]>;
    getReachableUsers(user: User): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    updateUser(id: number, user: User, updateUserDto: UpdateUserDto): Promise<User>;
    updateUsersUnits(user: User, updateUsersDto: UpdateUsersDto): Promise<User>[] | any;
    deleteUser(id: number, user: User): Promise<void>;
    setUsersRights(userId: number, user: User, setUserRightsDto: SetUserRightsDto): Promise<Rights[]>;
}

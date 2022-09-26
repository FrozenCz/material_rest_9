import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RightsService } from 'src/users/rights.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/models/user.entity';
import { GetUsersFilterDto } from 'src/users/dto/get-users-filter.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UpdateUsersDto } from 'src/users/dto/update-users.dto';
import { Rights } from 'src/users/models/rights.entity';
import { SetUserRightsDto } from 'src/users/dto/set-user-rights.dto';
import { CreateRightsDto } from 'src/users/dto/create-rights.dto';
import { AssetsService } from 'src/assets/assets.service';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { UserOutDto } from '../users/dto/out/User.out.dto';
import { SubscribeMessageEnum, WsGateway } from '../websocket/ws.gateway';
import { Transforms } from '../utils/transforms';

@Injectable()
export class UsersFacade {
  constructor(
    private usersService: UsersService,
    private rightsService: RightsService,
    private assetsService: AssetsService,
    private wsGateway: WsGateway,
  ) {
    this.usersService.countUsers().then((usersCount) => {
      if (!usersCount) {
        console.log('Nenalezeny žádní uživatelé');
        const superAdmin: CreateUserDto = {
          username: 'Administrator',
          password: 'BpKnop123!',
          name: 'admin',
          surname: 'hlavni',
        };
        this.usersService.createUser(superAdmin, null, true).then((res) => {
          console.log(
            'Vytvořen superadmin. Username: Administrator; password: BpKnop123!',
          );
          this.rightsService.fillRights().finally();
        });
      }
    });
  }

  createUser(createUserDto: CreateUserDto, user: User): Promise<User> {
    return Promise.all([
      this.usersService.createUser(createUserDto, user),
      this.getReachableUsersMap(user),
    ]).then(([user, reachableUsers]) => {
      this.wsGateway.wsChanges$.next({
        type: SubscribeMessageEnum.usersUpdate,
        changes: [Transforms.userToUserDto(user, reachableUsers)],
      });
      return user;
    });
  }

  async getUsers(
    getUsersFilterDto: GetUsersFilterDto,
    user: User,
  ): Promise<UserOutDto[]> {
    let reachableUsers: Map<number, User> = new Map<number, User>();
    if (user) {
      reachableUsers = await this.getReachableUsersMap(user);
    }
    return this.usersService.getUsers(getUsersFilterDto).then((users) => {
      return users.map((u) => {
        return {
          id: u.id,
          username: u.username,
          name: u.name,
          surname: u.surname,
          reachable: !!reachableUsers.get(u.id),
          unit_id: u.unit.id,
        };
      });
    });
  }

  getReachableUsers(user: User): Promise<User[]> {
    return this.usersService.getReachableUsers(user);
  }

  getReachableUsersMap(user: User): Promise<Map<number, User>> {
    return this.getReachableUsers(user).then((users) => {
      const userMap: Map<number, User> = new Map<number, User>();
      for (const user of users) {
        userMap.set(user.id, user);
      }
      return userMap;
    });
  }

  getUserById(id: number): Promise<User> {
    return this.usersService.getUserById(id);
  }

  updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
    user: User,
  ): Promise<User> {
    return Promise.all([
      this.usersService.updateUser(id, updateUserDto, user),
      this.getReachableUsersMap(user),
    ]).then(([user, users]) => {
      this.wsGateway.wsChanges$.next({
        type: SubscribeMessageEnum.usersUpdate,
        changes: [Transforms.userToUserDto(user, users)],
      });
      return user;
    });
  }

  updateUsersUnits(
    updateUsersDto: UpdateUsersDto,
    user: User,
  ): Promise<User>[] | any {
    return Promise.all([
      this.usersService.updateUsersUnits(updateUsersDto, user),
      this.getReachableUsersMap(user),
    ]).then(([users, reachableUsers]) => {
      this.wsGateway.wsChanges$.next({
        type: SubscribeMessageEnum.usersUpdate,
        changes: users.map((u) => Transforms.userToUserDto(u, reachableUsers)),
      });
    });
  }

  async deleteUser(id: number, user: User): Promise<void> {
    const userToDelete = await this.getUserById(id);
    const haveAssets = await this.assetsService.haveSomeAssets(userToDelete);
    if (haveAssets) {
      throw new HttpException('User have some assets!', 405);
    }
    await Promise.all([
      this.usersService.deleteUser(userToDelete, user),
      this.getReachableUsersMap(user),
    ]).then(([user, users]) => {
      this.wsGateway.wsChanges$.next({
        type: SubscribeMessageEnum.usersDelete,
        changes: [Transforms.userToUserDto(user, users)],
      });
    });
    return;
  }

  setUsersRights(
    userId: number,
    setUserRightsDto: SetUserRightsDto,
    user: User,
  ): Promise<Rights[]> {
    return this.usersService
      .setUsersRights(userId, setUserRightsDto, user)
      .then(async (rights) => {
        const reachableUsers = await this.getReachableUsersMap(user);
        const userUpd = await this.getUserById(userId);
        this.wsGateway.wsChanges$.next({
          type: SubscribeMessageEnum.usersUpdate,
          changes: [Transforms.userToUserDto(userUpd, reachableUsers)],
        });
        return rights;
      });
  }

  getRights(): Promise<Rights[]> {
    return this.rightsService.getRights();
  }

  createRights(createRightsDto: CreateRightsDto): Promise<Rights> {
    return this.rightsService.createRights(createRightsDto);
  }

  async validateUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.usersService.validateUser(authCredentialsDto);
  }
}

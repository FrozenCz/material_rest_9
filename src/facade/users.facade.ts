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

@Injectable()
export class UsersFacade {
  constructor(
    private usersService: UsersService,
    private rightsService: RightsService,
    private assetsService: AssetsService,
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
    return this.usersService.createUser(createUserDto, user);
  }

  getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<User[]> {
    return this.usersService.getUsers(getUsersFilterDto);
  }

  getReachableUsers(user: User): Promise<User[]> {
    return this.usersService.getReachableUsers(user);
  }

  getUserById(id: number): Promise<User> {
    return this.usersService.getUserById(id);
  }

  updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
    user: User,
  ): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto, user);
  }

  updateUsersUnits(
    updateUsersDto: UpdateUsersDto,
    user: User,
  ): Promise<User>[] | any {
    return this.usersService.updateUsersUnits(updateUsersDto, user);
  }

  async deleteUser(id: number, user: User): Promise<void> {
    const userToDelete = await this.getUserById(id);
    const haveAssets = await this.assetsService.haveSomeAssets(userToDelete);
    if (haveAssets) {
      throw new HttpException('User have some assets!', 405);
    }
    return this.usersService.deleteUser(userToDelete, user);
  }

  setUsersRights(
    userId: number,
    setUserRightsDto: SetUserRightsDto,
    user: User,
  ): Promise<Rights[]> {
    return this.usersService.setUsersRights(userId, setUserRightsDto, user);
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

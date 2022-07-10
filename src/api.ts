import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersFacade } from 'src/facade/users.facade';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/models/user.entity';
import { GetUsersFilterDto } from 'src/users/dto/get-users-filter.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UpdateUsersDto } from 'src/users/dto/update-users.dto';
import { SetUserRightsDto } from 'src/users/dto/set-user-rights.dto';
import { Rights } from 'src/users/models/rights.entity';
import { CreateRightsDto } from 'src/users/dto/create-rights.dto';
import { AuthCredentialsDto } from './auth/dto/auth-credentials.dto';
import { JwtPayloadInterface } from './auth/jwt-payload.interface';
import { AuthService } from './auth/auth.service';

@Injectable()
export class Api {
  constructor(
    private authService: AuthService,
    private usersFacade: UsersFacade,
  ) {}

  createUser(createUserDto: CreateUserDto, user: User): Promise<User> {
    return this.usersFacade.createUser(createUserDto, user);
  }

  getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<User[]> {
    return this.usersFacade.getUsers(getUsersFilterDto);
  }

  getReachableUsers(user: User): Promise<User[]> {
    return this.usersFacade.getReachableUsers(user);
  }

  getUserById(id: number): Promise<User> {
    return this.usersFacade.getUserById(id);
  }

  updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
    user: User,
  ): Promise<User> {
    return this.usersFacade.updateUser(id, updateUserDto, user);
  }

  updateUsersUnits(
    updateUsersDto: UpdateUsersDto,
    user: User,
  ): Promise<User>[] | any {
    return this.usersFacade.updateUsersUnits(updateUsersDto, user);
  }

  deleteUser(id: number, user: User): Promise<void> {
    return this.usersFacade.deleteUser(id, user);
  }

  setUsersRights(
    userId: number,
    setUserRightsDto: SetUserRightsDto,
    user: User,
  ): Promise<Rights[]> {
    return this.usersFacade.setUsersRights(userId, setUserRightsDto, user);
  }

  getRights(): Promise<Rights[]> {
    return this.usersFacade.getRights();
  }

  createRights(createRightsDto: CreateRightsDto): Promise<Rights> {
    return this.usersFacade.createRights(createRightsDto);
  }

  async singIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.usersFacade.validateUser(authCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    let rightsAsString = '';
    user.rights.forEach((rights) => {
      rightsAsString += rights.tag + ' ';
    });

    const unitId = user.unit?.id ? user.unit.id : null;
    const payload: JwtPayloadInterface = {
      userId: user.id,
      username: user.username,
      rights: rightsAsString.trim(),
      unitId: unitId,
    };
    const accessToken = this.authService.sign(payload);
    return { accessToken };
  }
}

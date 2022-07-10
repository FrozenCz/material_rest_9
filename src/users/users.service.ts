import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
import { SubscribeMessageEnum, WsGateway } from '../ws.gateway';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => UnitsService))
    private unitsService: UnitsService,
    @Inject(forwardRef(() => RightsService))
    private rightsService: RightsService,
    private wsGateway: WsGateway,
  ) {}

  /**
   * kontroluje zda je uzivatel co zadava pozadavek ve stromove strukture (null bere vše)
   * @param userEdited
   * @param editedBy
   */
  private async inScope(userEdited: User, editedBy: User): Promise<boolean> {
    if (userEdited.unit === null && editedBy.unit === null) {
      return true;
    } else {
      return await this.unitsService.isManagerInTree(
        userEdited.unit.id,
        editedBy,
      );
    }
  }

  /**
   * vraci pocet uzivatelu
   */
  async countUsers(): Promise<number> {
    return await User.count();
  }

  /**
   * tvorba uzivatele
   * @param createUserDto
   * @param creator
   * @param skipCheck
   * @return noveho uzivatele
   */
  async createUser(
    createUserDto: CreateUserDto,
    creator: User,
    skipCheck = false,
  ): Promise<User> {
    const { name, surname, password, username, unitId } = createUserDto;

    if (
      !skipCheck &&
      !(await this.unitsService.isManagerInTree(unitId, creator))
    ) {
      throw new ForbiddenException('Unable to create user!');
    }

    const user = new User();

    user.username = username;
    user.name = name;
    user.surname = surname;
    user.password = password; // still plain text

    if (unitId) {
      // if unit is int tree....
      user.unit = await this.unitsService.getUnitById(unitId);
    }

    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPasword(user.password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    if (!user) {
      throw new InternalServerErrorException('Unable to create user');
    }
    delete user.salt;
    delete user.password;

    this.wsGateway.wsChanges$.next({
      type: SubscribeMessageEnum.usersUpdate,
      changes: [user],
    });
    return user;
  }

  /**
   * ziskani uzivatele na zaklade ID, pokud nenalezen vyhozena vyjimka
   * @param userId
   * @param withRights
   * @return User | NotFoundException
   */
  async getUserById(userId: number): Promise<User> {
    const found = await User.findOne({ where: { id: userId } });

    if (!found) {
      throw new NotFoundException(`User with ID "${userId}" not found!`);
    }

    return found;
  }

  /**
   * ziskani vsech uzivatelu
   * @param getUsersFilterDto
   * @return pole uzivatelu
   */
  async getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<User[]> {
    const { unitId, unitIds } = getUsersFilterDto || {};
    const query = this.userRepository
      .createQueryBuilder('user')
      .addSelect(['user.unit'])
      .leftJoinAndSelect('user.unit', 'units')
      .where('user.id != 1')
      .andWhere('user.active = true');

    if (unitId) {
      query.where('user.unit = :unit', { unit: unitId });
    }

    if (unitIds) {
      query.where('user.unit IN (:...unitIds)', { unitIds });
    }

    const users = await query.getMany();
    return users;
  }

  /**
   * uprava uzivatelskych informaci
   * @param id
   * @param updateUserDto
   * @param user
   */
  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
    user: User,
  ): Promise<User> {
    const { name, surname, unitId } = updateUserDto;
    if (!name && !surname && !unitId)
      throw new BadRequestException('Not specified any changes');
    const userForUpdate = await this.getUserById(id);

    if (name) userForUpdate.name = name;
    if (surname) userForUpdate.surname = surname;

    if (unitId && (await this.unitsService.isManagerInTree(unitId, user))) {
      userForUpdate.unit = await this.unitsService.getUnitById(unitId);
    }

    const updatedUser = await userForUpdate.save();
    this.wsGateway.wsChanges$.next({
      type: SubscribeMessageEnum.usersUpdate,
      changes: [updatedUser],
    });

    return updatedUser;
  }

  async deleteUser(userToDelete: User, user: User): Promise<void> {
    const inScope = await this.inScope(userToDelete, user);

    if (userToDelete && inScope) {
      userToDelete.active = false;
      if (await User.save(userToDelete)) {
        this.wsGateway.wsChanges$.next({
          type: SubscribeMessageEnum.usersDelete,
          changes: [userToDelete],
        });
      }
      return;
    }

    throw new ForbiddenException(
      'You are not able to delete user from this unit',
    );
  }

  /**
   * nastaveni prav uzivatele
   * @param userId
   * @param setUserRightsDto
   */
  async setUsersRights(
    userId: number,
    setUserRightsDto: SetUserRightsDto,
    user: User,
  ): Promise<Rights[]> {
    const editedUser = await this.getUserById(userId);
    const inScope = this.inScope(editedUser, user);
    const { addRights, removeRights } = setUserRightsDto || {};
    if (addRights)
      if (editedUser && inScope) {
        if (addRights && addRights.length > 0) {
          for (const rightsToAdd of addRights) {
            const rights = await this.rightsService.getRightsById(rightsToAdd);
            if (rights && !editedUser.rights.includes(rights)) {
              editedUser.rights.push(rights);
            }
          }
        }

        if (removeRights && removeRights.length > 0) {
          for (const rightsToRemove of removeRights) {
            const rights = await this.rightsService.getRightsById(
              rightsToRemove,
            );
            if (rights && !!editedUser.rights.find((r) => r.id === rights.id)) {
              editedUser.rights = editedUser.rights
                .slice(0)
                .filter((r) => r.id !== rights.id);
            }
          }
        }
        try {
          const updUser = await editedUser.save();
          this.wsGateway.wsChanges$.next({
            type: SubscribeMessageEnum.usersUpdate,
            changes: [updUser],
          });
          return updUser.rights;
        } catch (e) {
          throw new InternalServerErrorException('Setting rights failed');
        }
      }
  }

  async updateUsersUnits(
    updateUsersDto: UpdateUsersDto,
    user: User,
  ): Promise<User[]> {
    const response = [];

    for (const userChanges of updateUsersDto.changes) {
      const userUpdate = await this.getUserById(userChanges.userId);
      const unit = await this.unitsService.getUnitById(userChanges.unitId);

      if (!(await this.inScope(userUpdate, user))) {
        throw new ForbiddenException(
          'You are not able to perform that, because you are not in user scope unit',
        );
      }

      if (
        !(await this.unitsService.isManagerInTree(userChanges.unitId, user))
      ) {
        throw new ForbiddenException(
          'You are not able to set this unit, because you are not in scope',
        );
      }

      userUpdate.unit = unit;
      const update = await userUpdate.save();
      response.push(update);
    }
    this.wsGateway.wsChanges$.next({
      type: SubscribeMessageEnum.usersUpdate,
      changes: response,
    });
    return response;
  }

  async getUnitByUserUnitId(user: User): Promise<Unit> {
    return this.unitsService.getUnitById(user.unit.id);
  }

  async getReachableUsers(user: User): Promise<User[]> {
    const reachableUnits = await this.unitsService.getDescendants(user.unit);
    return this.getUsers({
      unitIds: reachableUnits.map((unit) => unit.id),
    });
  }

  async getReachableUser(userId: number, user: User): Promise<User> {
    const usrs = await this.getReachableUsers(user);
    const reached = usrs.find((user) => user.id === userId);

    if (!reached) {
      throw new NotFoundException('User not found!');
    }
    return reached;
  }

  async validateUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect(['user.salt', 'user.password'])
      .leftJoinAndSelect('user.rights', 'rights')
      .leftJoinAndSelect('user.unit', 'units')
      .where('user.username = :username', { username })
      .andWhere('user.active = true')
      .getOne();

    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  }

  private async hashPasword(pass: string, salt: string): Promise<string> {
    return bcrypt.hash(pass, salt);
  }
}

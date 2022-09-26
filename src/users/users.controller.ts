import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RightsAllowed } from '../guards/rights-allowed.decorator';
import { GetUser } from './utils/get-user.decorator';
import { User } from './models/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { RightsGuard } from '../guards/rights.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { RightsTag } from './config/rights.list';
import { SetUserRightsDto } from './dto/set-user-rights.dto';
import { Rights } from './models/rights.entity';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Api } from 'src/api';
import { UserOutDto } from "./dto/out/User.out.dto";

@Controller('users')
export class UsersController {
  constructor(private api: Api) {}

  @Post()
  @UseGuards(AuthGuard(), RightsGuard)
  @RightsAllowed(RightsTag.createUser)
  createUser(
    @GetUser() user: User,
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.api.createUser(createUserDto, user);
  }

  @Get()
  @UseGuards(AuthGuard())
  getUsers(
    @GetUser() user: User,
    @Query(ValidationPipe) getUsersFilterDto: GetUsersFilterDto,
  ): Promise<UserOutDto[]> {
    return this.api.getUsers(getUsersFilterDto, user);
  }

  @Get('/reachable')
  @UseGuards(AuthGuard())
  getReachableUsers(@GetUser() user: User): Promise<User[]> {
    return this.api.getReachableUsers(user);
  }

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.api.getUserById(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard(), RightsGuard)
  @RightsAllowed(RightsTag.updateUsersInformation)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.api.updateUser(id, updateUserDto, user);
  }

  @Put()
  @UseGuards(AuthGuard(), RightsGuard)
  @RightsAllowed(RightsTag.updateUsersInformation)
  updateUsersUnits(
    @GetUser() user: User,
    @Body(ValidationPipe) updateUsersDto: UpdateUsersDto,
  ): Promise<User>[] | any {
    return this.api.updateUsersUnits(updateUsersDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard(), RightsGuard)
  @RightsAllowed(RightsTag.deleteUser)
  deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.api.deleteUser(id, user);
  }

  @Patch('/:id/rights')
  @UseGuards(AuthGuard(), RightsGuard)
  @RightsAllowed(RightsTag.settingRights)
  setUsersRights(
    @Param('id', ParseIntPipe) userId: number,
    @GetUser() user: User,
    @Body(ValidationPipe) setUserRightsDto: SetUserRightsDto,
  ): Promise<Rights[]> {
    if (
      (!setUserRightsDto.removeRights && !setUserRightsDto.addRights) ||
      (setUserRightsDto.removeRights?.length === 0 &&
        setUserRightsDto.addRights?.length === 0)
    )
      throw new BadRequestException('You must specified changes');
    return this.api.setUsersRights(userId, setUserRightsDto, user);
  }
}

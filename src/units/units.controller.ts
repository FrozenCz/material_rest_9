import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UnitsService } from './units.service';
import { Unit } from './unit.entity';
import { GetUnitsFilterDto } from './dto/get-units-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { RightsGuard } from '../guards/rights.guard';
import { RightsAllowed } from '../guards/rights-allowed.decorator';
import { RightsTag } from '../users/config/rights.list';
import { GetUser } from '../users/utils/get-user.decorator';
import { User } from '../users/models/user.entity';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Controller('units')
export class UnitsController {
  constructor(private unitsService: UnitsService) {}

  @Get()
  @UseGuards(AuthGuard())
  listUnits(
    @Query(ValidationPipe) getUnitsFilterDto: GetUnitsFilterDto,
    @GetUser() user: User,
  ): Promise<Unit[]> {
    return this.unitsService.listUnits(getUnitsFilterDto, user);
  }

  @Get('/getAllUnits')
  @UseGuards(AuthGuard())
  getAllUnits(@GetUser() user: User): Promise<Unit[]> {
    return this.unitsService.getAllUnits();
  }

  @Get('/:id')
  getUnit(@Param('id', ParseIntPipe) id: number): Promise<Unit> {
    return this.unitsService.getUnitById(id, true);
  }

  @Get('/:id/master_unit')
  getMasterUnit(@Param('id', ParseIntPipe) id: number): Promise<Unit> {
    return this.unitsService.getMasterUnit(id);
  }

  @Post()
  @UseGuards(AuthGuard(), RightsGuard)
  @RightsAllowed(RightsTag.createUnits)
  createUnit(
    @Body(ValidationPipe) createUnitDto: CreateUnitDto,
    @GetUser() user: User,
  ): Promise<Unit> {
    return this.unitsService.createUnit(createUnitDto, user);
  }

  @Put('/:id')
  @UseGuards(AuthGuard(), RightsGuard)
  @RightsAllowed(RightsTag.editUnits)
  editUnit(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUnitDto: UpdateUnitDto,
    @GetUser() user: User,
  ): Promise<Unit> {
    return this.unitsService.updateUnit(id, updateUnitDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard(), RightsGuard)
  @RightsAllowed(RightsTag.deleteUnits)
  deleteUnit(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.unitsService.deleteUnit(id, user);
  }

  @Get('/:id/ableToDelete')
  @UseGuards(AuthGuard(), RightsGuard)
  @RightsAllowed(RightsTag.deleteUnits)
  ableToDelete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<boolean> {
    return this.unitsService.ableToDelete(id);
  }

  @Post('/:idUnit/managers/:idUser')
  @UseGuards(AuthGuard(), RightsGuard)
  @RightsAllowed(RightsTag.addManagerToUnits)
  addManager(
    @Param('idUnit', ParseIntPipe) idUnit: number,
    @Param('idUser', ParseIntPipe) idUser: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.unitsService.addManager(idUnit, idUser, user);
  }

  @Delete('/:idUnit/managers/:idUser')
  @UseGuards(AuthGuard(), RightsGuard)
  @RightsAllowed(RightsTag.removeManagerFromUnits)
  removeManager(
    @Param('idUnit', ParseIntPipe) idUnit: number,
    @Param('idUser', ParseIntPipe) idUser: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.unitsService.removeManager(idUnit, idUser, user);
  }

  @Get('/:idUnit/descendants')
  getDescendantsById(
    @Param('idUnit', ParseIntPipe) idUnit: number,
  ): Promise<Unit[]> {
    return this.unitsService.getDescendantsById(idUnit);
  }
}

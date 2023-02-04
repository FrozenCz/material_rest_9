import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { Location } from './models/location.entity';
import {
  CreateLocationDto,
  SaveNfcDTO,
  UpdateLocationDto,
} from './dto/create-location.dto';
import { AuthGuard } from '@nestjs/passport';
import { RightsGuard } from '../guards/rights.guard';
import { RightsAllowed } from '../guards/rights-allowed.decorator';
import { RightsTag } from '../users/config/rights.list';
import { GetUser } from '../users/utils/get-user.decorator';
import { User } from '../users/models/user.entity';
import { Api } from '../api';

@Controller('/locations')
export class LocationsController {
  constructor(private api: Api) {}

  @Get()
  getLocations(): Promise<Location[]> {
    return this.api.getLocations();
  }

  @Post()
  @UseGuards(AuthGuard(), RightsGuard)
  @RightsAllowed(RightsTag.createLocation)
  createLocation(
    @GetUser() user: User,
    @Body(ValidationPipe) createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    return this.api.createLocation(createLocationDto, user);
  }

  @Patch('/:uuid')
  @UseGuards(AuthGuard(), RightsGuard)
  @RightsAllowed(RightsTag.createLocation)
  updateLocation(
    @GetUser() user: User,
    @Body(ValidationPipe) updateLocation: UpdateLocationDto,
    @Param('uuid') uuid: string,
  ): Promise<Location> {
    return this.api.updateLocation({ ...updateLocation, uuid }, user);
  }

  @Patch('/:uuid/nfc')
  @UseGuards(AuthGuard(), RightsGuard)
  @RightsAllowed(RightsTag.createLocation)
  saveNfcId(
    @GetUser() user: User,
    @Body(ValidationPipe) saveNfcId: SaveNfcDTO,
    @Param('uuid') locationUuid: string,
  ): Promise<Location> {
    return this.api.saveNfcId(locationUuid, saveNfcId, user);
  }

  @Delete('/:id')
  deleteLocation(@Param('id') id: string): Promise<void> {
    return this.api.deleteLocation(id);
    //todo: nejak kontrolovat kdo je zakladal ??? hierarchie?
  }
}

import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, ValidationPipe} from "@nestjs/common";
import {LocationsService} from "./locations.service";
import {Location} from "./models/location.entity";
import {CreateLocationDto} from "./dto/create-location.dto";
import {AuthGuard} from '@nestjs/passport';
import {RightsGuard} from '../guards/rights.guard';
import {RightsAllowed} from '../guards/rights-allowed.decorator';
import {RightsTag} from '../users/config/rights.list';
import {GetUser} from '../users/utils/get-user.decorator';
import {User} from '../users/models/user.entity';


@Controller('/locations')
export class LocationsController {
    constructor(private locationsService: LocationsService) {
    }

    @Get()
    getLocations(): Promise<Location[]> {
        return this.locationsService.listLocations();
    }

    @Post()
    @UseGuards(AuthGuard(), RightsGuard)
    @RightsAllowed(RightsTag.createLocation)
    createLocation(@GetUser() user: User, @Body(ValidationPipe) createLocationDto: CreateLocationDto): Promise<Location> {
        return this.locationsService.createLocation(createLocationDto, user);
    }

    @Delete('/:id')
    deleteLocation(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.locationsService.deleteLocation(id);
        //todo: nejak kontrolovat kdo je zakladal ??? hierarchie?
    }
}

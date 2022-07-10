import {Body, Controller, Get, Post, UseGuards, ValidationPipe} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {CreateRightsDto} from "./dto/create-rights.dto";
import {Rights} from "./models/rights.entity";
import {RightsAllowed} from "../guards/rights-allowed.decorator";
import {RightsGuard} from "../guards/rights.guard";
import {RightsTag} from "./config/rights.list";
import {Api} from 'src/api';

@Controller('rights')
export class RightsController {
    constructor(private api: Api) {

    }

    @Get()
    @UseGuards(AuthGuard(), RightsGuard)
    @RightsAllowed(RightsTag.settingRights)
    getRights(): Promise<Rights[]> {
        return this.api.getRights()
    }

    @Post()
    @UseGuards(AuthGuard(), RightsGuard)
    @RightsAllowed(RightsTag.setRights)
    createRights(@Body(ValidationPipe) createRightsDto: CreateRightsDto): Promise<Rights> {
        return this.api.createRights(createRightsDto);
    }

}



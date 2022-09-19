import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateAssetsDto } from './dto/create-assets.dto';
import { GetUser } from '../users/utils/get-user.decorator';
import { User } from '../users/models/user.entity';
import { Assets } from './models/assets.entity';
import { UpdateAssetsInformationDto } from './dto/update-assets-information.dto';
import { RightsGuard } from '../guards/rights.guard';
import { RightsAllowed } from '../guards/rights-allowed.decorator';
import { RightsTag } from '../users/config/rights.list';
import { ChangeUserBulkDto } from './dto/change-user-bulk.dto';
import { ChangeAssetInformationBulkDto } from './dto/change-asset-information-bulk.dto';
import { RemoveAssetsDto } from './dto/remove-assets.dto';
import { CreateAssetNoteDto } from './dto/create-asset-note.dto';
import { AssetsModelDto } from './dto/out/assetModel.dto';
import { Api } from '../api';

@Controller('assets')
export class AssetsController {
  constructor(private api: Api) {}

  @Post()
  @UseGuards(AuthGuard(), RightsGuard)
  @RightsAllowed(RightsTag.createAssets)
  createAssets(
    @Body(ValidationPipe) createAssetsDto: CreateAssetsDto,
    @GetUser() user: User,
  ): Promise<any> {
    return this.api.createAssets(createAssetsDto, user);
  }

  @Post(':id/note')
  @UseGuards(AuthGuard())
  addNote(
    @Param('id', ParseIntPipe) assetId: number,
    @Body(ValidationPipe) createAssetNoteDto: CreateAssetNoteDto,
    @GetUser() user: User,
  ): Promise<any> {
    return this.api.addNote({ ...createAssetNoteDto, assetId }, user);
  }

  @Patch(':id/changeUser')
  @UseGuards(AuthGuard(), RightsGuard)
  @RightsAllowed(RightsTag.changeAssetsUser)
  changeUser(
    @Body('userId', ParseIntPipe) userId: number,
    @Param('id', ParseIntPipe) assetId: number,
    @GetUser() user: User,
  ): Promise<Assets> {
    return this.api.changeUser(assetId, userId, user);
  }

  @Patch(':id/information')
  @UseGuards(AuthGuard(), RightsGuard)
  @RightsAllowed(RightsTag.changeAssetsInformation)
  updateInformation(
    @Body(ValidationPipe) updateAssetsDto: UpdateAssetsInformationDto,
    @Param('id', ParseIntPipe) assetId: number,
    @GetUser() user: User,
  ): Promise<Assets> {
    return this.api.changeAssetInformation(updateAssetsDto, assetId, user);
  }

  @Get()
  getAssetsList(): Promise<AssetsModelDto[]> {
    return this.api.getAssetsList();
  }

  @Patch('/changeAssetUserBulk')
  @UseGuards(AuthGuard(), RightsGuard)
  @RightsAllowed(RightsTag.changeAssetsUser)
  changeUserBulk(
    @Body(ValidationPipe) changeUserBulkDto: ChangeUserBulkDto[],
    @GetUser() user: User,
  ): Promise<Assets[]> {
    return this.api.changeUserBulk(changeUserBulkDto, user);
  }

  @Patch('/changeAssetInformationBulk')
  @UseGuards(AuthGuard(), RightsGuard)
  @RightsAllowed(RightsTag.changeAssetsUser)
  changeAssetInformationBulk(
    @Body(ValidationPipe)
    changeAssetInformationBulkDto: ChangeAssetInformationBulkDto[],
    @GetUser() user: User,
  ): Promise<Assets[]> {
    return this.api.changeAssetInformationBulk(
      changeAssetInformationBulkDto,
      user,
    );
  }

  @Delete()
  @UseGuards(AuthGuard(), RightsGuard)
  @RightsAllowed(RightsTag.removeAssets)
  removeAssets(
    @Body(ValidationPipe) removeAssetsDto: RemoveAssetsDto,
    @GetUser() user: User,
  ): Promise<any> {
    return this.api.removeAssets(removeAssetsDto, user);
  }
}

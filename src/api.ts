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
import { AssetsFacade } from './facade/assets.facade';
import { CreateAssetsDto } from './assets/dto/create-assets.dto';
import { UpdateAssetsInformationDto } from './assets/dto/update-assets-information.dto';
import { ChangeUserBulkDto } from './assets/dto/change-user-bulk.dto';
import { ChangeAssetInformationBulkDto } from './assets/dto/change-asset-information-bulk.dto';
import { RemoveAssetsDto } from './assets/dto/remove-assets.dto';
import { Location } from './locations/models/location.entity';
import { LocationFacade } from './facade/location.facade';
import {
  CreateLocationDto,
  SaveNfcDTO,
  UpdateLocation,
} from './locations/dto/create-location.dto';
import { UserOutDto } from './users/dto/out/User.out.dto';
import { AddImageToAssetDto } from './assets/dto/add-image-to-asset.dto';
import { Assets } from './assets/models/assets.entity';
import {
  AssetAttachmentsEntity,
  AssetAttachmentType,
} from './assets/models/assets-attachment.entity';
import { AssetTransferQuery, RequestForAssetTransfer, TransferActionParams } from "./assets/models/asset.model";



@Injectable()
export class Api {
  constructor(
    private authService: AuthService,
    private usersFacade: UsersFacade,
    private assetsFacade: AssetsFacade,
    private locationFacade: LocationFacade,
  ) {}

  createUser(createUserDto: CreateUserDto, user: User): Promise<User> {
    return this.usersFacade.createUser(createUserDto, user);
  }

  getUsers(
    getUsersFilterDto: GetUsersFilterDto,
    user?: User,
  ): Promise<UserOutDto[]> {
    return this.usersFacade.getUsers(getUsersFilterDto, user);
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

  createAssets(createAssetsDto: CreateAssetsDto, user: User) {
    return this.assetsFacade.createAssets(createAssetsDto, user);
  }

  addNote(param: { note: string; assetId: number }, user: User) {
    return this.assetsFacade.addNote(param, user);
  }

  changeUser(assetId: number, userId: number, user: User) {
    return this.assetsFacade.changeUser(assetId, userId, user);
  }

  changeAssetInformation(
    updateAssetsDto: UpdateAssetsInformationDto,
    assetId: number,
    user: User,
  ) {
    return this.assetsFacade.changeAssetInformation(
      updateAssetsDto,
      assetId,
      user,
    );
  }

  getAssetsList() {
    return this.assetsFacade.getAssetList();
  }

  changeUserBulk(changeUserBulkDto: ChangeUserBulkDto[], user: User) {
    return this.assetsFacade.changeUserBulk(changeUserBulkDto, user);
  }

  changeAssetInformationBulk(
    changeAssetInformationBulkDto: ChangeAssetInformationBulkDto[],
    user: User,
  ) {
    return this.assetsFacade.changeAssetInformationBulk(
      changeAssetInformationBulkDto,
      user,
    );
  }

  removeAssets(removeAssetsDto: RemoveAssetsDto, user: User) {
    return this.assetsFacade.removeAssets(removeAssetsDto, user);
  }

  getLocations(): Promise<Location[]> {
    return this.locationFacade.getLocations();
  }

  createLocation(createLocationDto: CreateLocationDto, user: User) {
    return this.locationFacade.createLocation(createLocationDto, user);
  }

  deleteLocation(id: string) {
    return this.locationFacade.deleteLocation(id);
  }

  updateLocation(
    updateLocation: UpdateLocation,
    user: User,
  ): Promise<Location> {
    return this.locationFacade.updateLocation(updateLocation, user);
  }

  saveNfcId(locationUuid: string, saveNfcId: SaveNfcDTO, user: User) {
    return this.locationFacade.safeNfcId(locationUuid, saveNfcId, user);
  }

  async addImageToAsset(
    addImageToAssetDto: AddImageToAssetDto,
    assetId: number,
  ) {
    const asset = await Assets.findOne({
      where: {
        id: assetId,
      },
    });

    const newAttach = new AssetAttachmentsEntity();
    newAttach.filename = addImageToAssetDto.filename;
    newAttach.binaryData = Buffer.from(
      addImageToAssetDto.base64.split(';base64,').pop(),
      'base64',
    );
    newAttach.type = AssetAttachmentType.image;
    newAttach.asset = asset;
    await newAttach.save();
    return;
  }

  getAssetAttachment(attachmentId: string): Promise<AssetAttachmentsEntity> {
    return this.assetsFacade.getAssetAttachment(attachmentId);
  }

  getAssetDetail(assetId: number) {
    return this.assetsFacade.getAssetDetail(assetId);
  }

  getCaretakers() {
    return this.usersFacade.getCaretakers();
  }

  createRequestForAssetTransfer(
    requestForAssetTransfer: RequestForAssetTransfer,
  ) {
    return this.usersFacade.createRequestForAssetTransfer(
      requestForAssetTransfer,
    );
  }

  assetTransferList(assetTransferQuery: AssetTransferQuery) {
    return this.assetsFacade.getAssetTransferList(assetTransferQuery);
  }

  getAssetTransferDetail(uuid: string) {
    return this.assetsFacade.getAssetTransferDetail(uuid);
  }

  transferAction(param: TransferActionParams) {
    return this.assetsFacade.transferAction(param);
  }
}

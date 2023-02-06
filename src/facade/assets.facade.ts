import { Injectable } from '@nestjs/common';
import { AssetsService } from '../assets/assets.service';
import { CreateAssetsDto } from '../assets/dto/create-assets.dto';
import { User } from '../users/models/user.entity';
import { UpdateAssetsInformationDto } from '../assets/dto/update-assets-information.dto';
import { AssetsModelDto } from '../assets/dto/out/assetModel.dto';
import { ChangeUserBulkDto } from '../assets/dto/change-user-bulk.dto';
import { ChangeAssetInformationBulkDto } from '../assets/dto/change-asset-information-bulk.dto';
import { RemoveAssetsDto } from '../assets/dto/remove-assets.dto';
import { SubscribeMessageEnum, WsGateway } from '../websocket/ws.gateway';
import { Transforms } from '../utils/transforms';

@Injectable()
export class AssetsFacade {
  constructor(private assetsService: AssetsService, private ws: WsGateway) {}

  createAssets(createAssetsDto: CreateAssetsDto, user: User): Promise<void> {
    return this.assetsService
      .createAssets(createAssetsDto, user)
      .then((asset) => {
        this.ws.wsChanges$.next({
          changes: [Transforms.assetToAssetDto(asset)],
          type: SubscribeMessageEnum.assetsUpdate,
        });
      });
  }

  addNote(param: { note: string; assetId: number }, user: User) {
    return this.assetsService.addNote(param, user);
  }

  changeUser(assetId: number, userId: number, user: User) {
    return this.assetsService
      .changeUser(assetId, userId, user)
      .then((asset) => {
        this.ws.wsChanges$.next({
          changes: [Transforms.assetToAssetDto(asset)],
          type: SubscribeMessageEnum.assetsUpdate,
        });
        return asset;
      });
  }

  changeAssetInformation(
    updateAssetsDto: UpdateAssetsInformationDto,
    assetId: number,
    user: User,
  ) {
    return this.assetsService
      .changeAssetInformation(updateAssetsDto, assetId, user)
      .then((asset) => {
        this.ws.wsChanges$.next({
          changes: [Transforms.assetToAssetDto(asset)],
          type: SubscribeMessageEnum.assetsUpdate,
        });
        return asset;
      });
  }

  getAssetList(): Promise<AssetsModelDto[]> {
    return this.assetsService.getAssetsList().then((assetsList) => {
      return assetsList.map((a) => Transforms.assetToAssetDto(a));
    });
  }

  changeUserBulk(changeUserBulkDto: ChangeUserBulkDto[], user: User) {
    return this.assetsService
      .changeUserBulk(changeUserBulkDto, user)
      .then((assets) => {
        this.ws.wsChanges$.next({
          changes: assets.map((a) => Transforms.assetToAssetDto(a)),
          type: SubscribeMessageEnum.assetsUpdate,
        });
        return assets;
      });
  }

  changeAssetInformationBulk(
    changeAssetInformationBulkDto: ChangeAssetInformationBulkDto[],
    user: User,
  ) {
    return this.assetsService
      .changeAssetInformationBulk(changeAssetInformationBulkDto, user)
      .then((assets) => {
        this.ws.wsChanges$.next({
          changes: assets.map((a) => Transforms.assetToAssetDto(a)),
          type: SubscribeMessageEnum.assetsUpdate,
        });
        return assets;
      });
  }

  removeAssets(removeAssetsDto: RemoveAssetsDto, user: User) {
    return this.assetsService
      .removeAssets(removeAssetsDto, user)
      .then((protocol) => {
        this.ws.wsChanges$.next({
          changes: protocol.assets.map((a) => Transforms.assetToAssetDto(a)),
          type: SubscribeMessageEnum.assetsUpdate,
        });
      });
  }

  getAssetAttachment(attachmentId: string) {
    return this.assetsService.getAssetAttachment(attachmentId);
  }

  async getAssetDetail(assetId: number) {
    return Transforms.assetToAssetDto(await this.assetsService.getAsset(assetId))
  }
}

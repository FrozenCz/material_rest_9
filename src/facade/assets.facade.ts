import { Injectable, NotFoundException } from "@nestjs/common";
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
import { AssetTransferQuery, TransferActionParams } from "../assets/models/asset.model";
import { LocationsService } from "../locations/locations.service";
import { StockTakingService } from "../assets/stock-taking.service";
import { UsersService } from "../users/users.service";
import { StockTakingEntity } from "../assets/models/stock-taking.entity";
import { Assets } from "../assets/models/assets.entity";

@Injectable()
export class AssetsFacade {
  constructor(
    private usersService: UsersService,
    private stockTakingService: StockTakingService,
    private assetsService: AssetsService,
    private ws: WsGateway,
    private locationService: LocationsService,
  ) {}

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
    return Transforms.assetToAssetDto(
      await this.assetsService.getAsset(assetId),
    );
  }

  getAssetTransferList(assetTransferQuery: AssetTransferQuery) {
    return this.assetsService.getAssetTransferList(assetTransferQuery);
  }

  getAssetTransferDetail(uuid: string) {
    return this.assetsService.getAssetTransferDetail(uuid);
  }

  transferAction(param: TransferActionParams) {
    return this.assetsService.transferAction(param);
  }

  async getBarcodes() {
    return this.assetsService.getAssetsList();
  }

  getStockTakings() {
    return this.stockTakingService.getStockTaking();
  }

  async createStockTaking(param: {
    name: string;
    solverId: number;
    user: User;
  }) {
    const { user } = param;

    const usersIds = await this.getUsersIds(user);
    const assets = await this.getAssetsByUsersIds(usersIds);

    return this.stockTakingService.createStockTaking({ ...param, assets });
  }

  private async getUsersIds(user: User) {
    return (await this.usersService.getReachableUsers(user)).map(
      (user) => user.id,
    );
  }

  private async getAssetsByUsersIds(usersIds: number[]) {
    return await this.assetsService.getAssetsList().then((assets) => {
      return assets.filter((asset) => usersIds.includes(asset.user_id));
    });
  }

  async getStockTakingInProgress(user: User) {
    const stockTakings = await this.getStockTakings();
    const assetsMap = await this.assetsService.getAssetsMap$();
    return await Promise.all(
      stockTakings.map(async (stockTaking) => {
        return {
          ...stockTaking,
          items: await this.getItems(stockTaking, assetsMap),
        };
      }),
    );
  }

  private async getItems(
    stockTaking: StockTakingEntity,
    assetsMap: Map<number, Assets>,
  ) {
    return await Promise.all(
      stockTaking.items.map(async (item) => {
        const found = assetsMap.get(item.assetId);
        if (!found) {
          throw new NotFoundException('Asset not found');
        }
        return {
          ...item,
          id: item.assetId,
          name: found.name,
          serialNumber: found.serialNumber,
          location: await found.location,
        };
      }),
    );
  }
}

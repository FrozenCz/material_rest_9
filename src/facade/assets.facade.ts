import { Injectable, NotFoundException } from '@nestjs/common';
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
import {
  AssetTransferQuery,
  TransferActionParams,
} from '../assets/models/asset.model';
import { LocationsService } from '../locations/locations.service';
import { StockTakingService } from '../assets/stock-taking.service';
import { UsersService } from '../users/users.service';
import { StockTakingEntity } from '../assets/models/stock-taking.entity';
import { Assets } from '../assets/models/assets.entity';
import { AssetChangeDTO } from '../assets/dto/barcodes.dto';
import { Location } from '../locations/models/location.entity';
import {
  PatchStockTakingDTO,
  PatchStockTakingItem,
} from '../assets/dto/stock-taking.dto';
import { StockTakingItemEntity } from '../assets/models/stock-taking-item.entity';
import { UtilFuncs } from '../utils/utilFuncs';

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
    return this.stockTakingService.getStockTakings();
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
    const stockTakings = await this.getStockTakingsByUser(user);
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

  private async getStockTakingsByUser(user: User) {
    return await this.getStockTakings().then((stockTakings) =>
      stockTakings.filter((stockTaking) => stockTaking.solverId === user.id),
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

  async saveChangesBarcodes(param: { assets: AssetChangeDTO[] }) {
    const { assets } = param;

    const onlyWithLocations = assets.filter((a) => a.locationConfirmedUuid);

    const withLocation: Assets[] = await Promise.all(
      onlyWithLocations.map(async (asset) => {
        const assetEntity = await Assets.findOneOrFail({
          where: { id: asset.id },
        });
        const location = await Location.findOneOrFail({
          where: { uuid: asset.locationConfirmedUuid },
        });
        assetEntity.location = Promise.resolve(location);
        return assetEntity;
      }),
    );
    await Assets.save(withLocation);
    return;
  }

  async patchStockTakingInProgress(param: {
    stockTakings: PatchStockTakingDTO[];
    user: User;
  }) {
    const { user, stockTakings } = param;
    const stockTakingEntities =
      await this.stockTakingService.getStockTakingsByUuids(
        this.getUuids(stockTakings),
      );
    const stockTakingsForSolver = this.getUnclosedStockTakingsForSolver({
      stockTakingEntities,
      user,
    });
    const resultsMap: Map<string, PatchStockTakingItem[]> =
      this.getStockTakingItemMapByStockTakingUuid(stockTakings);
    const assetsMap = await this.assetsService.getAssetsMap$();

    stockTakingsForSolver.forEach((stockTaking) =>
      this.updateStockTakingItems({
        stockTakingItems: stockTaking.items,
        result: resultsMap.get(stockTaking.uuid) ?? [],
        assetsMap,
      }),
    );
    return StockTakingEntity.save(stockTakingsForSolver);
  }

  private getUnclosedStockTakingsForSolver(param: {
    stockTakingEntities: StockTakingEntity[];
    user: User;
  }) {
    const { user, stockTakingEntities } = param;
    return stockTakingEntities.filter(
      (s) => s.solverId === user.id && !s.closedAt,
    );
  }

  private getUuids(stockTakings: PatchStockTakingDTO[]) {
    return stockTakings.map((stock) => stock.uuid);
  }

  private getStockTakingItemMapByStockTakingUuid(
    stockTakings: PatchStockTakingDTO[],
  ): Map<string, PatchStockTakingItem[]> {
    const map: Map<string, PatchStockTakingItem[]> = new Map();
    stockTakings.forEach((stockTaking) =>
      map.set(stockTaking.uuid, stockTaking.items),
    );
    return map;
  }

  private updateStockTakingItems(param: {
    result: PatchStockTakingItem[];
    stockTakingItems: StockTakingItemEntity[];
    assetsMap: Map<number, Assets>;
  }): StockTakingItemEntity[] {

    const { result, stockTakingItems, assetsMap } = param;

    const stockTakingItemsMap: Map<string, PatchStockTakingItem> =
      UtilFuncs.createMap<string, PatchStockTakingItem>({
        propertyName: 'uuid',
        array: result,
      });

    stockTakingItems.forEach((item) => {
      const asset = assetsMap.get(item.assetId);
      const result = stockTakingItemsMap.get(item.uuid);

      if (!result) {
        throw new NotFoundException('result not found id: ' + item.stockTakingUuid);
      }
      if (!asset) {
        throw new NotFoundException('asset not found in: ' + item.assetId);
      }

      if (result.locationUuid && result.foundAt) {
        asset.location_uuid = result.locationUuid;
        asset.save();
        item.foundInLocationUuid = result.locationUuid;
        item.foundAt = result.foundAt;
      }
    });
    StockTakingItemEntity.save(stockTakingItems);
    return stockTakingItems;
  }
}

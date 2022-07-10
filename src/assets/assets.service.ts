import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAssetsDto } from './dto/create-assets.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Assets, AssetState } from './models/assets.entity';
import { User } from '../users/models/user.entity';
import { CategoriesService } from '../categories/categories.service';
import { UsersService } from '../users/users.service';
import { UnitsService } from '../units/units.service';
import { UpdateAssetsInformationDto } from './dto/update-assets-information.dto';
import { ChangeUserBulkDto } from './dto/change-user-bulk.dto';
import { Connection, EntityManager, Repository } from 'typeorm';
import { ChangeAssetInformationBulkDto } from './dto/change-asset-information-bulk.dto';
import { RemoveAssetsDto } from './dto/remove-assets.dto';
import { ProtocolsService } from '../protocols/protocols.service';
import { RemovingProtocol } from '../protocols/models/protocols.entity';
import { SubscribeMessageEnum, WsGateway } from '../ws.gateway';
import { HistoryService } from '../history/history.service';
import { HistoryRelatedTo } from '../history/models/history.model';
import { noop } from 'rxjs';
import { AssetNote } from './models/assetNote.entity';
import { CreateAssetNote } from './models/assetNote.model';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Assets)
    private assetsRepository: Repository<Assets>,
    @Inject(forwardRef(() => CategoriesService))
    private categoriesService: CategoriesService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private unitsService: UnitsService,
    private connection: Connection,
    private protocolService: ProtocolsService,
    private gateway: WsGateway,
    private historyService: HistoryService,
  ) {}

  /**
   * Metoda pro vytvareni majetku
   * @param newAsset
   * @param creator
   */
  async createAssets(newAsset: CreateAssetsDto, creator: User): Promise<any> {
    const { categoryId, userId } = newAsset || {};

    const category = await this.categoriesService.getCategoryById(categoryId);
    const user = await this.usersService.getUserById(userId);

    if (!(await this.unitsService.isManagerInTree(user.unit?.id, user))) {
      throw new ForbiddenException('You are not able to perform this action');
    }

    const nAsset = new Assets();

    for (const property of Object.keys(newAsset)) {
      if (!['userId', 'categoryId'].includes(property)) {
        nAsset[property] = newAsset[property];
      }
    }

    nAsset.user = user;
    nAsset.category = category;

    await nAsset.save();
    delete nAsset.user.rights;
    delete nAsset.user.username;

    if (nAsset) {
      this.historyService
        .saveHistory(
          {
            asset: nAsset,
            relatedTo: HistoryRelatedTo.assetsCreate,
            changedFrom: '',
            changedTo: JSON.stringify(nAsset),
          },
          creator,
        )
        .then(noop);
    }

    this.gateway.wsChanges$.next({
      changes: [nAsset],
      type: SubscribeMessageEnum.assetsUpdate,
    });

    return nAsset;
  }

  async getAssetsList(): Promise<Assets[]> {
    const query = await this.assetsRepository.createQueryBuilder('assets');
    query
      .leftJoinAndSelect('assets.user', 'users')
      .leftJoinAndSelect('assets.category', 'categories')
      .leftJoinAndSelect('users.unit', 'units')
      .leftJoinAndSelect('assets.removingProtocol', 'protocols')
      .select([
        'assets',
        'protocols',
        'users.id',
        'users.name',
        'users.surname',
        'categories.id',
        'units.id',
        'units.name',
      ]);
    return query.getMany();
  }

  async getAsset(id: number): Promise<Assets> {
    const found = await this.assetsRepository.findOne({ where: { id: id } });
    if (!found) {
      throw new NotFoundException('Asset Id not found!');
    }
    return found;
  }

  async changeAssetInformation(
    updateAssetsDto: UpdateAssetsInformationDto,
    assetId: number,
    user: User,
    managerForTransaction?: EntityManager,
  ): Promise<Assets> {
    const asset = await this.getAsset(assetId);
    const changedFrom = { ...asset };

    const inTree = await this.unitsService.isManagerInTree(
      asset.user?.unit?.id,
      user,
    );

    if (!inTree) {
      throw new UnauthorizedException('You are not able to do this operation');
    }

    for (const oKey of Object.keys(updateAssetsDto)) {
      asset[oKey] = updateAssetsDto[oKey];
    }

    if (managerForTransaction) {
      // socket solved on bulk function
      const manager = await managerForTransaction.save(asset);
      if (manager) {
        this.historyService
          .saveHistory(
            {
              asset: asset,
              relatedTo: HistoryRelatedTo.assetsChangeInformation,
              changedFrom: JSON.stringify(changedFrom),
              changedTo: JSON.stringify(asset),
            },
            user,
          )
          .then(noop);
      }
      return manager;
    }

    const savedAsset = await asset.save();
    if (savedAsset) {
      this.historyService
        .saveHistory(
          {
            asset: savedAsset,
            relatedTo: HistoryRelatedTo.assetsChangeInformation,
            changedFrom: JSON.stringify(changedFrom),
            changedTo: JSON.stringify(savedAsset),
          },
          user,
        )
        .then(noop);
    }
    this.gateway.wsChanges$.next({
      changes: [savedAsset],
      type: SubscribeMessageEnum.assetsUpdate,
    });
    return savedAsset;
  }

  async getAssets(assetsIds: number[]): Promise<Assets[]> {
    const assets = await this.assetsRepository.findByIds(assetsIds);
    return assets;
  }

  /**
   * method for changing assets user
   * @param assetId
   * @param userId
   * @param user
   * @param managerForTransaction when performed transaction
   */
  async changeUser(
    assetId: number,
    userId: number,
    user: User,
    managerForTransaction?: EntityManager,
  ): Promise<Assets> {
    const toUser: User = await this.usersService.getReachableUser(userId, user);
    const asset: Assets = await this.assetsRepository.findOneOrFail({
      where: { id: assetId },
    });
    const isInTree = await this.unitsService.isManagerInTree(
      asset.user.unit.id,
      user,
    );
    const updatedFrom = { ...asset };

    if (!isInTree) {
      throw new ForbiddenException('You are not able to do this operation');
    }
    asset.user = toUser;
    if (managerForTransaction) {
      // socked solved on bulk function due manager
      const manager = await managerForTransaction.save(asset);
      if (manager) {
        this.historyService
          .saveHistory(
            {
              asset: asset,
              relatedTo: HistoryRelatedTo.assetsUserChange,
              changedFrom: JSON.stringify(updatedFrom),
              changedTo: JSON.stringify(asset),
            },
            user,
          )
          .then(noop);
      }
      return manager;
    }
    const savedAsset = await asset.save();

    if (savedAsset) {
      this.historyService
        .saveHistory(
          {
            asset: savedAsset,
            changedFrom: JSON.stringify(updatedFrom),
            changedTo: JSON.stringify(savedAsset),
            relatedTo: HistoryRelatedTo.assetsUserChange,
          },
          user,
        )
        .then(noop);
    }

    this.gateway.wsChanges$.next({
      changes: [savedAsset],
      type: SubscribeMessageEnum.assetsUpdate,
    });
    return savedAsset;
  }

  changeUserBulk(
    changeUserBulkDto: ChangeUserBulkDto[],
    user: User,
  ): Promise<Assets[]> {
    return this.connection
      .transaction(async (manager) => {
        return await Promise.all(
          changeUserBulkDto.map(async (change) => {
            return await this.changeUser(
              change.assetId,
              change.newUserId,
              user,
              manager,
            );
          }),
        );
      })
      .then((changedAssets) => {
        this.gateway.wsChanges$.next({
          changes: changedAssets,
          type: SubscribeMessageEnum.assetsUpdate,
        });
        return changedAssets;
      });
  }

  changeAssetInformationBulk(
    changeAssetInformationBulkDto: ChangeAssetInformationBulkDto[],
    user: User,
  ) {
    return this.connection
      .transaction(async (manager) => {
        return await Promise.all(
          changeAssetInformationBulkDto.map(async (change) => {
            return await this.changeAssetInformation(
              change,
              change.assetId,
              user,
              manager,
            );
          }),
        );
      })
      .then((changedAssets) => {
        this.gateway.wsChanges$.next({
          changes: changedAssets,
          type: SubscribeMessageEnum.assetsUpdate,
        });
        return changedAssets;
      });
  }

  async removeAssets(
    removeAssetsDto: RemoveAssetsDto,
    user: User,
  ): Promise<RemovingProtocol> {
    const assets = await this.assetsRepository.findByIds(
      removeAssetsDto.assetsIds,
    );

    if (
      !assets.length ||
      assets.some(
        (asset) =>
          asset.state === AssetState.removed ||
          !this.unitsService.isManagerInTree(asset.user?.unit?.id, user),
      )
    ) {
      throw new BadRequestException('Bad assets');
    }

    return this.connection.transaction(async (manager) => {
      return await Promise.all(
        assets.map(async (asset) => {
          asset.state = AssetState.removed;
          return await manager.save(asset);
        }),
      )
        .then((changedAssets) => {
          if (changedAssets) {
            changedAssets?.forEach((savedAsset) => {
              this.historyService
                .saveHistory(
                  {
                    asset: savedAsset,
                    relatedTo: HistoryRelatedTo.assetsRemoved,
                    changedFrom: JSON.stringify(savedAsset),
                    changedTo: '',
                  },
                  user,
                )
                .then(noop);
            });
          }
          this.gateway.wsChanges$.next({
            changes: changedAssets,
            type: SubscribeMessageEnum.assetsUpdate,
          });
        })
        .then(() => {
          return this.protocolService.createRemovingProtocol(
            { ...removeAssetsDto, assets },
            user,
            manager,
          );
        });
    });
  }

  async haveSomeAssets(user: User): Promise<boolean> {
    return false;
    // return !! (await this.assetsRepository.findOne({where: {userid: user.id}}));
  }

  async addNote(createAssetNote: CreateAssetNote, user): Promise<AssetNote> {
    const asset = await this.getAsset(createAssetNote.assetId);

    const note = new AssetNote();
    note.text = createAssetNote.note;
    note.user = user;
    note.asset = asset;

    const savedNote = await note.save();
    console.log(savedNote);
    return savedNote;
  }
}

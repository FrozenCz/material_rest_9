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
import { Connection, DataSource, EntityManager, Repository } from 'typeorm';
import { ChangeAssetInformationBulkDto } from './dto/change-asset-information-bulk.dto';
import { RemoveAssetsDto } from './dto/remove-assets.dto';
import { ProtocolsService } from '../protocols/protocols.service';
import { RemovingProtocol } from '../protocols/models/protocols.entity';

import { HistoryService } from '../history/history.service';
import { HistoryRelatedTo } from '../history/models/history.model';
import { async, noop, Observable } from "rxjs";
import { AssetNote } from './models/assetNote.entity';
import { CreateAssetNote } from './models/assetNote.model';
import { Location } from '../locations/models/location.entity';
import { AssetAttachmentsEntity } from './models/assets-attachment.entity';
import {
  AssetTransferQuery,
  ReqAssetTransferWithCaretakers,
  TransferActionParams,
} from './models/asset.model';
import { AssetTransfersEntity } from './models/asset-transfers.entity';
import { StockTakingEntity } from "./models/stock-taking.entity";
import { StockTakingItemEntity } from "./models/stock-taking-item.entity";
import * as Util from "util";
import { UtilFuncs } from "../utils/utilFuncs";

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Assets)
    private assetsRepository: Repository<Assets>,
    @InjectRepository(AssetAttachmentsEntity)
    private assetsAttachmentRepository: Repository<AssetAttachmentsEntity>,
    @InjectRepository(AssetTransfersEntity)
    private assetTransfersRepository: Repository<AssetTransfersEntity>,
    @Inject(forwardRef(() => CategoriesService))
    private categoriesService: CategoriesService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private unitsService: UnitsService,
    private connection: Connection,
    private protocolService: ProtocolsService,
    private historyService: HistoryService,
    private dataSource: DataSource,
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

    nAsset.category = Promise.resolve(category);
    await nAsset.save();

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
    return nAsset;
  }

  async getAssetsList(): Promise<Assets[]> {
    // const query = await this.assetsRepository.createQueryBuilder('assets');
    // query
    //   .leftJoinAndSelect('assets.user', 'users')
    //   .leftJoinAndSelect('assets.category', 'categories')
    //   .leftJoinAndSelect('users.unit', 'units')
    //   .leftJoinAndSelect('assets.removingProtocol', 'protocols')
    //   .leftJoinAndSelect('assets.assetAttachments', 'assetAttachments')
    //   .select([
    //     'assets',
    //     'protocols',
    //     'users.id',
    //     'users.name',
    //     'users.surname',
    //     'categories.id',
    //     'units.id',
    //     'units.name',
    //     'assetAttachments'
    //   ]);

    // return query.getMany();
    return Assets.find();
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
    const unitId = (await asset.user).unit.id;

    if (updateAssetsDto.location_uuid) {
      asset.location = Location.findOne({
        where: { uuid: updateAssetsDto.location_uuid },
      });
    } else {
      asset.location = Promise.resolve(null);
    }

    const inTree = await this.unitsService.isManagerInTree(unitId, user);

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
    const toUser: Promise<User> = this.usersService.getReachableUser(
      userId,
      user,
    );
    const asset: Assets = await this.assetsRepository.findOneOrFail({
      where: { id: assetId },
    });
    const unitId = (await asset.user).unit.id;
    const isInTree = await this.unitsService.isManagerInTree(unitId, user);
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
    return savedAsset;
  }

  changeUserBulk(
    changeUserBulkDto: ChangeUserBulkDto[],
    user: User,
  ): Promise<Assets[]> {
    return this.connection.transaction(async (manager) => {
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
    });
  }

  changeAssetInformationBulk(
    changeAssetInformationBulkDto: ChangeAssetInformationBulkDto[],
    user: User,
  ) {
    return this.connection.transaction(async (manager) => {
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
      assets.some(async (asset) => {
        const unitId = (await asset.user).unit.id;
        return (
          asset.state === AssetState.removed ||
          !(await this.unitsService.isManagerInTree(unitId, user))
        );
      })
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
    return savedNote;
  }

  async getAssetAttachment(attachmentId: string) {
    const attachment = await this.findAssetAttachmentWithBinaryById(
      attachmentId,
    );
    if (!attachment) {
      throw new NotFoundException('Contract attachment not found');
    }
    return attachment;
  }

  private async findAssetAttachmentWithBinaryById(
    id: string,
  ): Promise<AssetAttachmentsEntity> {
    return await this.assetsAttachmentRepository
      .createQueryBuilder('assets_attachments')
      .addSelect(['assets_attachments.binaryData'])
      .where('assets_attachments.attachment_id = :attachment_id', {
        attachment_id: id,
      })
      .getOne();
  }

  async createRequestForAssetTransfer(
    requestForAssetTransfer: ReqAssetTransferWithCaretakers,
  ) {
    const { assets, caretakerTo, caretakerFrom } = requestForAssetTransfer;

    await this.checkIfAnyAssetIsNotInActiveTransfer(assets);

    const assetTransfersEntity = new AssetTransfersEntity();
    assetTransfersEntity.assets = assets;
    assetTransfersEntity.caretakerFrom = caretakerFrom;
    assetTransfersEntity.caretakerTo = caretakerTo;
    assetTransfersEntity.message = requestForAssetTransfer.message;

    return assetTransfersEntity.save();
  }

  private async checkIfAnyAssetIsNotInActiveTransfer(assets: Assets[]) {
    for (let asset of assets) {
      if (await this.isInActiveTransfer(asset.id)) {
        throw new BadRequestException(
          `asset ${asset.id} is in active transfer!`,
        );
      }
    }
  }

  async getAssetTransferList(assetTransferQuery: AssetTransferQuery) {
    const { caretakerFrom, assetId, rejected, accepted, reverted } =
      assetTransferQuery;
    const query = await this.assetTransfersRepository.createQueryBuilder(
      'asset_transfers',
    );
    query.leftJoin('asset_transfers.assets', 'assets');
    query.addSelect('assets.id');

    if (caretakerFrom) {
      query.andWhere('asset_transfers.caretakerFrom @> :caretakerFrom', {
        caretakerFrom: {
          id: caretakerFrom,
        },
      });
    }

    if (assetId) {
      query.andWhere('assets.id = :assetId', { assetId });
    }

    if (rejected !== undefined) {
      if (rejected) {
        query.andWhere('asset_transfers.rejectedAt IS NOT NULL');
      } else {
        query.andWhere('asset_transfers.rejectedAt IS NULL');
      }
    }

    if (accepted !== undefined) {
      if (accepted) {
        query.andWhere('asset_transfers.acceptedAt IS NOT NULL');
      } else {
        query.andWhere('asset_transfers.acceptedAt IS NULL');
      }
    }

    if (reverted !== undefined) {
      if (reverted) {
        query.andWhere('asset_transfers.revertedAt IS NOT NULL');
      } else {
        query.andWhere('asset_transfers.revertedAt IS NULL');
      }
    }

    return query.getMany();
  }

  async getAssetTransferDetail(uuid: string) {
    const query = await this.assetTransfersRepository.createQueryBuilder(
      'asset_transfers',
    );
    query.leftJoin('asset_transfers.assets', 'assets');
    query.addSelect('assets.id');
    query.where('asset_transfers.uuid = :uuid', { uuid });
    return query.getOneOrFail();
  }

  async transferAction(param: TransferActionParams) {
    const { uuid, user, action } = param;
    const transfer = await this.getAssetTransferDetail(uuid);
    const userTo = await this.usersService.getUserById(transfer.caretakerTo.id);
    const userFrom = await this.usersService.getUserById(
      transfer.caretakerFrom.id,
    );

    if (action === 'revert') {
      return this.handleRevertAction({ transfer, user });
    }

    if (action === 'reject') {
      return this.handleRejectAction({ transfer, user });
    }

    if (!this.isUnitMatch(userTo, transfer)) {
      throw new BadRequestException('There is a problem with unit');
    }

    if (!this.isUserCaretakerTo(transfer, user)) {
      throw new UnauthorizedException(
        'You are not able to accept this transfer',
      );
    }

    const assets = transfer.assets;
    assets.forEach((asset) => {
      asset.user = Promise.resolve(userTo);
      throw new BadRequestException('Asset is in active transfer!');
    });
    transfer.acceptedAt = new Date();

    await this.dataSource.transaction(async (manager) => {
      await manager.save(assets);
      await manager.save(transfer);
    });

    return;
  }

  private async isInActiveTransfer(assetId: number): Promise<boolean> {
    const foundActive = await this.getAssetTransferList({
      assetId,
      rejected: false,
      reverted: false,
      accepted: false,
    });
    return foundActive.length > 0;
  }

  private isUserCaretakerFrom(user: User, transfer: AssetTransfersEntity) {
    return (
      user.id === transfer.caretakerFrom.id &&
      transfer.caretakerFrom.unit_id === user.unit.id
    );
  }

  private isUnitMatch(userTo: User, transfer: AssetTransfersEntity) {
    return userTo.unit.id === transfer.caretakerTo.unit_id;
  }

  private isUserCaretakerTo(
    transfer: AssetTransfersEntity,
    user: User,
  ): boolean {
    return (
      transfer.caretakerTo.id === user.id &&
      transfer.caretakerTo.unit_id === user.unit.id
    );
  }

  private async handleRevertAction(params: {
    transfer: AssetTransfersEntity;
    user: User;
  }) {
    const { user, transfer } = params;
    if (!this.isUserCaretakerFrom(user, transfer)) {
      throw new UnauthorizedException('Not an owner of transfer!');
    }

    transfer.revertedAt = new Date();
    return await transfer.save();
  }

  private async handleRejectAction(params: {
    transfer: AssetTransfersEntity;
    user: User;
  }) {
    const { user, transfer } = params;
    if (!this.isUserCaretakerTo(transfer, user)) {
      throw new UnauthorizedException('Not an owner of transfer!');
    }

    transfer.rejectedAt = new Date();
    return await transfer.save();
  }


  async getAssetsMap$(): Promise<Map<number, Assets>> {
    return this.getAssetsList().then(assets => UtilFuncs.createMap<number, Assets>({
      array: assets,
      propertyName: 'id'
    }))
  }

  async closeStockTaking(param: {uuid: string; user: User}) {
    const {uuid} = param;
    const stockTaking = await StockTakingEntity.findOneOrFail({where: {uuid}});

    stockTaking.closedAt = new Date()

    return stockTaking.save();
  }
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const assets_entity_1 = require("./models/assets.entity");
const categories_service_1 = require("../categories/categories.service");
const users_service_1 = require("../users/users.service");
const units_service_1 = require("../units/units.service");
const typeorm_2 = require("typeorm");
const protocols_service_1 = require("../protocols/protocols.service");
const history_service_1 = require("../history/history.service");
const history_model_1 = require("../history/models/history.model");
const rxjs_1 = require("rxjs");
const assetNote_entity_1 = require("./models/assetNote.entity");
const location_entity_1 = require("../locations/models/location.entity");
const assets_attachment_entity_1 = require("./models/assets-attachment.entity");
const asset_transfers_entity_1 = require("./models/asset-transfers.entity");
const utilFuncs_1 = require("../utils/utilFuncs");
let AssetsService = class AssetsService {
    constructor(assetsRepository, assetsAttachmentRepository, assetTransfersRepository, categoriesService, usersService, unitsService, connection, protocolService, historyService, dataSource) {
        this.assetsRepository = assetsRepository;
        this.assetsAttachmentRepository = assetsAttachmentRepository;
        this.assetTransfersRepository = assetTransfersRepository;
        this.categoriesService = categoriesService;
        this.usersService = usersService;
        this.unitsService = unitsService;
        this.connection = connection;
        this.protocolService = protocolService;
        this.historyService = historyService;
        this.dataSource = dataSource;
    }
    async createAssets(newAsset, creator) {
        var _a;
        const { categoryId, userId } = newAsset || {};
        const category = await this.categoriesService.getCategoryById(categoryId);
        const user = await this.usersService.getUserById(userId);
        if (!(await this.unitsService.isManagerInTree((_a = user.unit) === null || _a === void 0 ? void 0 : _a.id, user))) {
            throw new common_1.ForbiddenException('You are not able to perform this action');
        }
        const nAsset = new assets_entity_1.Assets();
        for (const property of Object.keys(newAsset)) {
            if (!['userId', 'categoryId'].includes(property)) {
                nAsset[property] = newAsset[property];
            }
        }
        nAsset.category = Promise.resolve(category);
        await nAsset.save();
        if (nAsset) {
            this.historyService
                .saveHistory({
                asset: nAsset,
                relatedTo: history_model_1.HistoryRelatedTo.assetsCreate,
                changedFrom: '',
                changedTo: JSON.stringify(nAsset),
            }, creator)
                .then(rxjs_1.noop);
        }
        return nAsset;
    }
    async getAssetsList() {
        return assets_entity_1.Assets.find();
    }
    async getAsset(id) {
        const found = await this.assetsRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new common_1.NotFoundException('Asset Id not found!');
        }
        return found;
    }
    async changeAssetInformation(updateAssetsDto, assetId, user, managerForTransaction) {
        const asset = await this.getAsset(assetId);
        const changedFrom = Object.assign({}, asset);
        const unitId = (await asset.user).unit.id;
        if (updateAssetsDto.location_uuid) {
            asset.location = location_entity_1.Location.findOne({
                where: { uuid: updateAssetsDto.location_uuid },
            });
        }
        else {
            asset.location = Promise.resolve(null);
        }
        const inTree = await this.unitsService.isManagerInTree(unitId, user);
        if (!inTree) {
            throw new common_1.UnauthorizedException('You are not able to do this operation');
        }
        for (const oKey of Object.keys(updateAssetsDto)) {
            asset[oKey] = updateAssetsDto[oKey];
        }
        if (managerForTransaction) {
            const manager = await managerForTransaction.save(asset);
            if (manager) {
                this.historyService
                    .saveHistory({
                    asset: asset,
                    relatedTo: history_model_1.HistoryRelatedTo.assetsChangeInformation,
                    changedFrom: JSON.stringify(changedFrom),
                    changedTo: JSON.stringify(asset),
                }, user)
                    .then(rxjs_1.noop);
            }
            return manager;
        }
        const savedAsset = await asset.save();
        if (savedAsset) {
            this.historyService
                .saveHistory({
                asset: savedAsset,
                relatedTo: history_model_1.HistoryRelatedTo.assetsChangeInformation,
                changedFrom: JSON.stringify(changedFrom),
                changedTo: JSON.stringify(savedAsset),
            }, user)
                .then(rxjs_1.noop);
        }
        return savedAsset;
    }
    async getAssets(assetsIds) {
        const assets = await this.assetsRepository.findByIds(assetsIds);
        return assets;
    }
    async changeUser(assetId, userId, user, managerForTransaction) {
        const toUser = this.usersService.getReachableUser(userId, user);
        const asset = await this.assetsRepository.findOneOrFail({
            where: { id: assetId },
        });
        const unitId = (await asset.user).unit.id;
        const isInTree = await this.unitsService.isManagerInTree(unitId, user);
        const updatedFrom = Object.assign({}, asset);
        if (!isInTree) {
            throw new common_1.ForbiddenException('You are not able to do this operation');
        }
        asset.user = toUser;
        if (managerForTransaction) {
            const manager = await managerForTransaction.save(asset);
            if (manager) {
                this.historyService
                    .saveHistory({
                    asset: asset,
                    relatedTo: history_model_1.HistoryRelatedTo.assetsUserChange,
                    changedFrom: JSON.stringify(updatedFrom),
                    changedTo: JSON.stringify(asset),
                }, user)
                    .then(rxjs_1.noop);
            }
            return manager;
        }
        const savedAsset = await asset.save();
        if (savedAsset) {
            this.historyService
                .saveHistory({
                asset: savedAsset,
                changedFrom: JSON.stringify(updatedFrom),
                changedTo: JSON.stringify(savedAsset),
                relatedTo: history_model_1.HistoryRelatedTo.assetsUserChange,
            }, user)
                .then(rxjs_1.noop);
        }
        return savedAsset;
    }
    changeUserBulk(changeUserBulkDto, user) {
        return this.connection.transaction(async (manager) => {
            return await Promise.all(changeUserBulkDto.map(async (change) => {
                return await this.changeUser(change.assetId, change.newUserId, user, manager);
            }));
        });
    }
    changeAssetInformationBulk(changeAssetInformationBulkDto, user) {
        return this.connection.transaction(async (manager) => {
            return await Promise.all(changeAssetInformationBulkDto.map(async (change) => {
                return await this.changeAssetInformation(change, change.assetId, user, manager);
            }));
        });
    }
    async removeAssets(removeAssetsDto, user) {
        const assets = await this.assetsRepository.findByIds(removeAssetsDto.assetsIds);
        if (!assets.length ||
            assets.some(async (asset) => {
                const unitId = (await asset.user).unit.id;
                return (asset.state === assets_entity_1.AssetState.removed ||
                    !(await this.unitsService.isManagerInTree(unitId, user)));
            })) {
            throw new common_1.BadRequestException('Bad assets');
        }
        return this.connection.transaction(async (manager) => {
            return await Promise.all(assets.map(async (asset) => {
                asset.state = assets_entity_1.AssetState.removed;
                return await manager.save(asset);
            }))
                .then((changedAssets) => {
                if (changedAssets) {
                    changedAssets === null || changedAssets === void 0 ? void 0 : changedAssets.forEach((savedAsset) => {
                        this.historyService
                            .saveHistory({
                            asset: savedAsset,
                            relatedTo: history_model_1.HistoryRelatedTo.assetsRemoved,
                            changedFrom: JSON.stringify(savedAsset),
                            changedTo: '',
                        }, user)
                            .then(rxjs_1.noop);
                    });
                }
            })
                .then(() => {
                return this.protocolService.createRemovingProtocol(Object.assign(Object.assign({}, removeAssetsDto), { assets }), user, manager);
            });
        });
    }
    async haveSomeAssets(user) {
        return false;
    }
    async addNote(createAssetNote, user) {
        const asset = await this.getAsset(createAssetNote.assetId);
        const note = new assetNote_entity_1.AssetNote();
        note.text = createAssetNote.note;
        note.user = user;
        note.asset = asset;
        const savedNote = await note.save();
        return savedNote;
    }
    async getAssetAttachment(attachmentId) {
        const attachment = await this.findAssetAttachmentWithBinaryById(attachmentId);
        if (!attachment) {
            throw new common_1.NotFoundException('Contract attachment not found');
        }
        return attachment;
    }
    async findAssetAttachmentWithBinaryById(id) {
        return await this.assetsAttachmentRepository
            .createQueryBuilder('assets_attachments')
            .addSelect(['assets_attachments.binaryData'])
            .where('assets_attachments.attachment_id = :attachment_id', {
            attachment_id: id,
        })
            .getOne();
    }
    async createRequestForAssetTransfer(requestForAssetTransfer) {
        const { assets, caretakerTo, caretakerFrom } = requestForAssetTransfer;
        await this.checkIfAnyAssetIsNotInActiveTransfer(assets);
        const assetTransfersEntity = new asset_transfers_entity_1.AssetTransfersEntity();
        assetTransfersEntity.assets = assets;
        assetTransfersEntity.caretakerFrom = caretakerFrom;
        assetTransfersEntity.caretakerTo = caretakerTo;
        assetTransfersEntity.message = requestForAssetTransfer.message;
        return assetTransfersEntity.save();
    }
    async checkIfAnyAssetIsNotInActiveTransfer(assets) {
        for (let asset of assets) {
            if (await this.isInActiveTransfer(asset.id)) {
                throw new common_1.BadRequestException(`asset ${asset.id} is in active transfer!`);
            }
        }
    }
    async getAssetTransferList(assetTransferQuery) {
        const { caretakerFrom, assetId, rejected, accepted, reverted } = assetTransferQuery;
        const query = await this.assetTransfersRepository.createQueryBuilder('asset_transfers');
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
            }
            else {
                query.andWhere('asset_transfers.rejectedAt IS NULL');
            }
        }
        if (accepted !== undefined) {
            if (accepted) {
                query.andWhere('asset_transfers.acceptedAt IS NOT NULL');
            }
            else {
                query.andWhere('asset_transfers.acceptedAt IS NULL');
            }
        }
        if (reverted !== undefined) {
            if (reverted) {
                query.andWhere('asset_transfers.revertedAt IS NOT NULL');
            }
            else {
                query.andWhere('asset_transfers.revertedAt IS NULL');
            }
        }
        return query.getMany();
    }
    async getAssetTransferDetail(uuid) {
        const query = await this.assetTransfersRepository.createQueryBuilder('asset_transfers');
        query.leftJoin('asset_transfers.assets', 'assets');
        query.addSelect('assets.id');
        query.where('asset_transfers.uuid = :uuid', { uuid });
        return query.getOneOrFail();
    }
    async transferAction(param) {
        const { uuid, user, action } = param;
        const transfer = await this.getAssetTransferDetail(uuid);
        const userTo = await this.usersService.getUserById(transfer.caretakerTo.id);
        const userFrom = await this.usersService.getUserById(transfer.caretakerFrom.id);
        if (action === 'revert') {
            return this.handleRevertAction({ transfer, user });
        }
        if (action === 'reject') {
            return this.handleRejectAction({ transfer, user });
        }
        if (!this.isUnitMatch(userTo, transfer)) {
            throw new common_1.BadRequestException('There is a problem with unit');
        }
        if (!this.isUserCaretakerTo(transfer, user)) {
            throw new common_1.UnauthorizedException('You are not able to accept this transfer');
        }
        const assets = transfer.assets;
        assets.forEach((asset) => {
            asset.user = Promise.resolve(userTo);
            throw new common_1.BadRequestException('Asset is in active transfer!');
        });
        transfer.acceptedAt = new Date();
        await this.dataSource.transaction(async (manager) => {
            await manager.save(assets);
            await manager.save(transfer);
        });
        return;
    }
    async isInActiveTransfer(assetId) {
        const foundActive = await this.getAssetTransferList({
            assetId,
            rejected: false,
            reverted: false,
            accepted: false,
        });
        return foundActive.length > 0;
    }
    isUserCaretakerFrom(user, transfer) {
        return (user.id === transfer.caretakerFrom.id &&
            transfer.caretakerFrom.unit_id === user.unit.id);
    }
    isUnitMatch(userTo, transfer) {
        return userTo.unit.id === transfer.caretakerTo.unit_id;
    }
    isUserCaretakerTo(transfer, user) {
        return (transfer.caretakerTo.id === user.id &&
            transfer.caretakerTo.unit_id === user.unit.id);
    }
    async handleRevertAction(params) {
        const { user, transfer } = params;
        if (!this.isUserCaretakerFrom(user, transfer)) {
            throw new common_1.UnauthorizedException('Not an owner of transfer!');
        }
        transfer.revertedAt = new Date();
        return await transfer.save();
    }
    async handleRejectAction(params) {
        const { user, transfer } = params;
        if (!this.isUserCaretakerTo(transfer, user)) {
            throw new common_1.UnauthorizedException('Not an owner of transfer!');
        }
        transfer.rejectedAt = new Date();
        return await transfer.save();
    }
    async getAssetsMap$() {
        return this.getAssetsList().then(assets => utilFuncs_1.UtilFuncs.createMap({
            array: assets,
            propertyName: 'id'
        }));
    }
};
AssetsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(assets_entity_1.Assets)),
    __param(1, (0, typeorm_1.InjectRepository)(assets_attachment_entity_1.AssetAttachmentsEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(asset_transfers_entity_1.AssetTransfersEntity)),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => categories_service_1.CategoriesService))),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        categories_service_1.CategoriesService,
        users_service_1.UsersService,
        units_service_1.UnitsService,
        typeorm_2.Connection,
        protocols_service_1.ProtocolsService,
        history_service_1.HistoryService,
        typeorm_2.DataSource])
], AssetsService);
exports.AssetsService = AssetsService;
//# sourceMappingURL=assets.service.js.map
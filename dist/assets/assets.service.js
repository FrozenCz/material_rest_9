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
let AssetsService = class AssetsService {
    constructor(assetsRepository, categoriesService, usersService, unitsService, connection, protocolService, historyService) {
        this.assetsRepository = assetsRepository;
        this.categoriesService = categoriesService;
        this.usersService = usersService;
        this.unitsService = unitsService;
        this.connection = connection;
        this.protocolService = protocolService;
        this.historyService = historyService;
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
        console.log(savedNote);
        return savedNote;
    }
};
AssetsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(assets_entity_1.Assets)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => categories_service_1.CategoriesService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        categories_service_1.CategoriesService,
        users_service_1.UsersService,
        units_service_1.UnitsService,
        typeorm_2.Connection,
        protocols_service_1.ProtocolsService,
        history_service_1.HistoryService])
], AssetsService);
exports.AssetsService = AssetsService;
//# sourceMappingURL=assets.service.js.map
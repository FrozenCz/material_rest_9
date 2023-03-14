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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsFacade = void 0;
const common_1 = require("@nestjs/common");
const assets_service_1 = require("../assets/assets.service");
const ws_gateway_1 = require("../websocket/ws.gateway");
const transforms_1 = require("../utils/transforms");
const locations_service_1 = require("../locations/locations.service");
const stock_taking_service_1 = require("../assets/stock-taking.service");
const users_service_1 = require("../users/users.service");
let AssetsFacade = class AssetsFacade {
    constructor(usersService, stockTakingService, assetsService, ws, locationService) {
        this.usersService = usersService;
        this.stockTakingService = stockTakingService;
        this.assetsService = assetsService;
        this.ws = ws;
        this.locationService = locationService;
    }
    createAssets(createAssetsDto, user) {
        return this.assetsService
            .createAssets(createAssetsDto, user)
            .then((asset) => {
            this.ws.wsChanges$.next({
                changes: [transforms_1.Transforms.assetToAssetDto(asset)],
                type: ws_gateway_1.SubscribeMessageEnum.assetsUpdate,
            });
        });
    }
    addNote(param, user) {
        return this.assetsService.addNote(param, user);
    }
    changeUser(assetId, userId, user) {
        return this.assetsService
            .changeUser(assetId, userId, user)
            .then((asset) => {
            this.ws.wsChanges$.next({
                changes: [transforms_1.Transforms.assetToAssetDto(asset)],
                type: ws_gateway_1.SubscribeMessageEnum.assetsUpdate,
            });
            return asset;
        });
    }
    changeAssetInformation(updateAssetsDto, assetId, user) {
        return this.assetsService
            .changeAssetInformation(updateAssetsDto, assetId, user)
            .then((asset) => {
            this.ws.wsChanges$.next({
                changes: [transforms_1.Transforms.assetToAssetDto(asset)],
                type: ws_gateway_1.SubscribeMessageEnum.assetsUpdate,
            });
            return asset;
        });
    }
    getAssetList() {
        return this.assetsService.getAssetsList().then((assetsList) => {
            return assetsList.map((a) => transforms_1.Transforms.assetToAssetDto(a));
        });
    }
    changeUserBulk(changeUserBulkDto, user) {
        return this.assetsService
            .changeUserBulk(changeUserBulkDto, user)
            .then((assets) => {
            this.ws.wsChanges$.next({
                changes: assets.map((a) => transforms_1.Transforms.assetToAssetDto(a)),
                type: ws_gateway_1.SubscribeMessageEnum.assetsUpdate,
            });
            return assets;
        });
    }
    changeAssetInformationBulk(changeAssetInformationBulkDto, user) {
        return this.assetsService
            .changeAssetInformationBulk(changeAssetInformationBulkDto, user)
            .then((assets) => {
            this.ws.wsChanges$.next({
                changes: assets.map((a) => transforms_1.Transforms.assetToAssetDto(a)),
                type: ws_gateway_1.SubscribeMessageEnum.assetsUpdate,
            });
            return assets;
        });
    }
    removeAssets(removeAssetsDto, user) {
        return this.assetsService
            .removeAssets(removeAssetsDto, user)
            .then((protocol) => {
            this.ws.wsChanges$.next({
                changes: protocol.assets.map((a) => transforms_1.Transforms.assetToAssetDto(a)),
                type: ws_gateway_1.SubscribeMessageEnum.assetsUpdate,
            });
        });
    }
    getAssetAttachment(attachmentId) {
        return this.assetsService.getAssetAttachment(attachmentId);
    }
    async getAssetDetail(assetId) {
        return transforms_1.Transforms.assetToAssetDto(await this.assetsService.getAsset(assetId));
    }
    getAssetTransferList(assetTransferQuery) {
        return this.assetsService.getAssetTransferList(assetTransferQuery);
    }
    getAssetTransferDetail(uuid) {
        return this.assetsService.getAssetTransferDetail(uuid);
    }
    transferAction(param) {
        return this.assetsService.transferAction(param);
    }
    async getBarcodes() {
        return this.assetsService.getAssetsList();
    }
    getStockTakings() {
        return this.stockTakingService.getStockTaking();
    }
    async createStockTaking(param) {
        const { user } = param;
        const usersIds = await this.getUsersIds(user);
        const assets = await this.getAssetsByUsersIds(usersIds);
        return this.stockTakingService.createStockTaking(Object.assign(Object.assign({}, param), { assets }));
    }
    async getUsersIds(user) {
        return (await this.usersService.getReachableUsers(user)).map((user) => user.id);
    }
    async getAssetsByUsersIds(usersIds) {
        return await this.assetsService.getAssetsList().then((assets) => {
            return assets.filter((asset) => usersIds.includes(asset.user_id));
        });
    }
    async getStockTakingInProgress(user) {
        const stockTakings = await this.getStockTakings();
        const assetsMap = await this.assetsService.getAssetsMap$();
        return await Promise.all(stockTakings.map(async (stockTaking) => {
            return Object.assign(Object.assign({}, stockTaking), { items: await this.getItems(stockTaking, assetsMap) });
        }));
    }
    async getItems(stockTaking, assetsMap) {
        return await Promise.all(stockTaking.items.map(async (item) => {
            const found = assetsMap.get(item.assetId);
            if (!found) {
                throw new common_1.NotFoundException('Asset not found');
            }
            return Object.assign(Object.assign({}, item), { id: item.assetId, name: found.name, serialNumber: found.serialNumber, location: await found.location });
        }));
    }
};
AssetsFacade = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        stock_taking_service_1.StockTakingService,
        assets_service_1.AssetsService,
        ws_gateway_1.WsGateway,
        locations_service_1.LocationsService])
], AssetsFacade);
exports.AssetsFacade = AssetsFacade;
//# sourceMappingURL=assets.facade.js.map
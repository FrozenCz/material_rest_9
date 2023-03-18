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
exports.Api = void 0;
const common_1 = require("@nestjs/common");
const users_facade_1 = require("./facade/users.facade");
const auth_service_1 = require("./auth/auth.service");
const assets_facade_1 = require("./facade/assets.facade");
const location_facade_1 = require("./facade/location.facade");
const assets_entity_1 = require("./assets/models/assets.entity");
const assets_attachment_entity_1 = require("./assets/models/assets-attachment.entity");
let Api = class Api {
    constructor(authService, usersFacade, assetsFacade, locationFacade) {
        this.authService = authService;
        this.usersFacade = usersFacade;
        this.assetsFacade = assetsFacade;
        this.locationFacade = locationFacade;
    }
    createUser(createUserDto, user) {
        return this.usersFacade.createUser(createUserDto, user);
    }
    getUsers(getUsersFilterDto, user) {
        return this.usersFacade.getUsers(getUsersFilterDto, user);
    }
    getReachableUsers(user) {
        return this.usersFacade.getReachableUsers(user);
    }
    getUserById(id) {
        return this.usersFacade.getUserById(id);
    }
    updateUser(id, updateUserDto, user) {
        return this.usersFacade.updateUser(id, updateUserDto, user);
    }
    updateUsersUnits(updateUsersDto, user) {
        return this.usersFacade.updateUsersUnits(updateUsersDto, user);
    }
    deleteUser(id, user) {
        return this.usersFacade.deleteUser(id, user);
    }
    setUsersRights(userId, setUserRightsDto, user) {
        return this.usersFacade.setUsersRights(userId, setUserRightsDto, user);
    }
    getRights() {
        return this.usersFacade.getRights();
    }
    createRights(createRightsDto) {
        return this.usersFacade.createRights(createRightsDto);
    }
    async singIn(authCredentialsDto) {
        var _a;
        const user = await this.usersFacade.validateUser(authCredentialsDto);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        let rightsAsString = '';
        user.rights.forEach((rights) => {
            rightsAsString += rights.tag + ' ';
        });
        const unitId = ((_a = user.unit) === null || _a === void 0 ? void 0 : _a.id) ? user.unit.id : null;
        const payload = {
            userId: user.id,
            username: user.username,
            rights: rightsAsString.trim(),
            unitId: unitId,
        };
        const accessToken = this.authService.sign(payload);
        return { accessToken };
    }
    createAssets(createAssetsDto, user) {
        return this.assetsFacade.createAssets(createAssetsDto, user);
    }
    addNote(param, user) {
        return this.assetsFacade.addNote(param, user);
    }
    changeUser(assetId, userId, user) {
        return this.assetsFacade.changeUser(assetId, userId, user);
    }
    changeAssetInformation(updateAssetsDto, assetId, user) {
        return this.assetsFacade.changeAssetInformation(updateAssetsDto, assetId, user);
    }
    getAssetsList() {
        return this.assetsFacade.getAssetList();
    }
    changeUserBulk(changeUserBulkDto, user) {
        return this.assetsFacade.changeUserBulk(changeUserBulkDto, user);
    }
    changeAssetInformationBulk(changeAssetInformationBulkDto, user) {
        return this.assetsFacade.changeAssetInformationBulk(changeAssetInformationBulkDto, user);
    }
    removeAssets(removeAssetsDto, user) {
        return this.assetsFacade.removeAssets(removeAssetsDto, user);
    }
    getLocations() {
        return this.locationFacade.getLocations();
    }
    createLocation(createLocationDto, user) {
        return this.locationFacade.createLocation(createLocationDto, user);
    }
    deleteLocation(id) {
        return this.locationFacade.deleteLocation(id);
    }
    updateLocation(updateLocation, user) {
        return this.locationFacade.updateLocation(updateLocation, user);
    }
    saveNfcId(locationUuid, saveNfcId) {
        return this.locationFacade.safeNfcId(locationUuid, saveNfcId);
    }
    async addImageToAsset(addImageToAssetDto, assetId) {
        const asset = await assets_entity_1.Assets.findOne({
            where: {
                id: assetId,
            },
        });
        const newAttach = new assets_attachment_entity_1.AssetAttachmentsEntity();
        newAttach.filename = addImageToAssetDto.filename;
        newAttach.binaryData = Buffer.from(addImageToAssetDto.base64.split(';base64,').pop(), 'base64');
        newAttach.type = assets_attachment_entity_1.AssetAttachmentType.image;
        newAttach.asset = asset;
        await newAttach.save();
        return;
    }
    getAssetAttachment(attachmentId) {
        return this.assetsFacade.getAssetAttachment(attachmentId);
    }
    getAssetDetail(assetId) {
        return this.assetsFacade.getAssetDetail(assetId);
    }
    getCaretakers() {
        return this.usersFacade.getCaretakers();
    }
    createRequestForAssetTransfer(requestForAssetTransfer) {
        return this.usersFacade.createRequestForAssetTransfer(requestForAssetTransfer);
    }
    assetTransferList(assetTransferQuery) {
        return this.assetsFacade.getAssetTransferList(assetTransferQuery);
    }
    getAssetTransferDetail(uuid) {
        return this.assetsFacade.getAssetTransferDetail(uuid);
    }
    transferAction(param) {
        return this.assetsFacade.transferAction(param);
    }
    getBarcodes() {
        return this.assetsFacade.getBarcodes();
    }
    getStockTakings() {
        return this.assetsFacade.getStockTakings();
    }
    createStockTaking(param) {
        return this.assetsFacade.createStockTaking(param);
    }
    getStockTakingInProgress(user) {
        return this.assetsFacade.getStockTakingInProgress(user);
    }
    saveChangesBarcodes(param) {
        return this.assetsFacade.saveChangesBarcodes(param);
    }
    patchStockTakingInProgress(param) {
        return this.assetsFacade.patchStockTakingInProgress(param);
    }
    closeStockTaking(param) {
        return this.assetsFacade.closeStockTaking(param);
    }
};
Api = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_facade_1.UsersFacade,
        assets_facade_1.AssetsFacade,
        location_facade_1.LocationFacade])
], Api);
exports.Api = Api;
//# sourceMappingURL=api.js.map
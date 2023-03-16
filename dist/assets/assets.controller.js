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
exports.AssetsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const create_assets_dto_1 = require("./dto/create-assets.dto");
const get_user_decorator_1 = require("../users/utils/get-user.decorator");
const user_entity_1 = require("../users/models/user.entity");
const update_assets_information_dto_1 = require("./dto/update-assets-information.dto");
const rights_guard_1 = require("../guards/rights.guard");
const rights_allowed_decorator_1 = require("../guards/rights-allowed.decorator");
const rights_list_1 = require("../users/config/rights.list");
const remove_assets_dto_1 = require("./dto/remove-assets.dto");
const create_asset_note_dto_1 = require("./dto/create-asset-note.dto");
const api_1 = require("../api");
const add_image_to_asset_dto_1 = require("./dto/add-image-to-asset.dto");
const createRequestForAssetTransfer_dto_1 = require("./dto/createRequestForAssetTransfer.dto");
const asset_model_1 = require("./models/asset.model");
const stock_taking_dto_1 = require("./dto/stock-taking.dto");
const barcodes_dto_1 = require("./dto/barcodes.dto");
let AssetsController = class AssetsController {
    constructor(api) {
        this.api = api;
    }
    getTransferList(assetTransferQuery) {
        return this.api.assetTransferList(assetTransferQuery);
    }
    getTransferDetail(uuid) {
        return this.api.getAssetTransferDetail(uuid);
    }
    transferAction(uuid, action, user) {
        return this.api.transferAction({ uuid, user, action });
    }
    createRequestForAssetTransfer(createRequestForAssetTransferDto) {
        return this.api.createRequestForAssetTransfer(createRequestForAssetTransferDto);
    }
    getBarcodes() {
        return this.api.getBarcodes().then((assets) => {
            return Promise.all(assets.map(async (asset) => {
                return Object.assign(Object.assign({}, asset), { found: false, location: await asset.location });
            }));
        });
    }
    barcodesChanges(saveChangesDTO) {
        return this.api.saveChangesBarcodes(Object.assign({}, saveChangesDTO));
    }
    createStockTaking(user, createStockTaking) {
        return this.api.createStockTaking({ user, name: createStockTaking.name, solverId: createStockTaking.solverId });
    }
    getStockTaking() {
        return this.api.getStockTaking();
    }
    getStockTakingInProgress(user) {
        return this.api.getStockTakingInProgress(user);
    }
    patchStockTakingInProgress(user, patchStockTakingDTO) {
        return this.api.patchStockTakingInProgress(Object.assign(Object.assign({}, patchStockTakingDTO), { user }));
    }
    async getAssetAttachment(attachmentId, res) {
        const attachEnt = await this.api.getAssetAttachment(attachmentId);
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(attachEnt.binaryData);
    }
    createAssets(createAssetsDto, user) {
        return this.api.createAssets(createAssetsDto, user);
    }
    addNote(assetId, createAssetNoteDto, user) {
        return this.api.addNote(Object.assign(Object.assign({}, createAssetNoteDto), { assetId }), user);
    }
    changeUser(userId, assetId, user) {
        return this.api.changeUser(assetId, userId, user);
    }
    updateInformation(updateAssetsDto, assetId, user) {
        return this.api.changeAssetInformation(updateAssetsDto, assetId, user);
    }
    addImageToAsset(addImageToAssetDto, assetId, user) {
        return this.api.addImageToAsset(addImageToAssetDto, assetId);
    }
    getAssetDetail(assetId) {
        return this.api.getAssetDetail(assetId);
    }
    getAssetsList() {
        return this.api.getAssetsList();
    }
    changeUserBulk(changeUserBulkDto, user) {
        return this.api.changeUserBulk(changeUserBulkDto, user);
    }
    changeAssetInformationBulk(changeAssetInformationBulkDto, user) {
        return this.api.changeAssetInformationBulk(changeAssetInformationBulkDto, user);
    }
    removeAssets(removeAssetsDto, user) {
        return this.api.removeAssets(removeAssetsDto, user);
    }
};
__decorate([
    (0, common_1.Get)('/transfers'),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [asset_model_1.AssetTransferQuery]),
    __metadata("design:returntype", Object)
], AssetsController.prototype, "getTransferList", null);
__decorate([
    (0, common_1.Get)('/transfers/:uuid'),
    __param(0, (0, common_1.Param)('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], AssetsController.prototype, "getTransferDetail", null);
__decorate([
    (0, common_1.Post)('/transfers/:uuid/actions/:action'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.createAssets),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Param)('action')),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, user_entity_1.User]),
    __metadata("design:returntype", Object)
], AssetsController.prototype, "transferAction", null);
__decorate([
    (0, common_1.Post)('/transfers'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.createAssets),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createRequestForAssetTransfer_dto_1.CreateRequestForAssetTransferDto]),
    __metadata("design:returntype", Object)
], AssetsController.prototype, "createRequestForAssetTransfer", null);
__decorate([
    (0, common_1.Get)('/barcodes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "getBarcodes", null);
__decorate([
    (0, common_1.Post)('barcodes/changes'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [barcodes_dto_1.BarcodesChangesDTO]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "barcodesChanges", null);
__decorate([
    (0, common_1.Post)('/stock-taking'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.createAssets),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        stock_taking_dto_1.CreateStockTakingDTO]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "createStockTaking", null);
__decorate([
    (0, common_1.Get)('/stock-taking'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "getStockTaking", null);
__decorate([
    (0, common_1.Get)('/stock-taking-in-progress'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "getStockTakingInProgress", null);
__decorate([
    (0, common_1.Patch)('/stock-taking-in-progress'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        stock_taking_dto_1.PatchStockTakingsDTO]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "patchStockTakingInProgress", null);
__decorate([
    (0, common_1.Get)(':assetId/attachments/:attachment_id/:filename'),
    __param(0, (0, common_1.Param)('attachment_id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "getAssetAttachment", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.createAssets),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_assets_dto_1.CreateAssetsDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "createAssets", null);
__decorate([
    (0, common_1.Post)(':id/note'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_asset_note_dto_1.CreateAssetNoteDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "addNote", null);
__decorate([
    (0, common_1.Patch)(':id/changeUser'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.changeAssetsUser),
    __param(0, (0, common_1.Body)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "changeUser", null);
__decorate([
    (0, common_1.Patch)(':id/information'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.changeAssetsInformation),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_assets_information_dto_1.UpdateAssetsInformationDto, Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "updateInformation", null);
__decorate([
    (0, common_1.Post)(':id/images'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.changeAssetsInformation),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_image_to_asset_dto_1.AddImageToAssetDto, Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "addImageToAsset", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "getAssetDetail", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "getAssetsList", null);
__decorate([
    (0, common_1.Patch)('/changeAssetUserBulk'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.changeAssetsUser),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "changeUserBulk", null);
__decorate([
    (0, common_1.Patch)('/changeAssetInformationBulk'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.changeAssetsUser),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "changeAssetInformationBulk", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.removeAssets),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_assets_dto_1.RemoveAssetsDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AssetsController.prototype, "removeAssets", null);
AssetsController = __decorate([
    (0, common_1.Controller)('assets'),
    __metadata("design:paramtypes", [api_1.Api])
], AssetsController);
exports.AssetsController = AssetsController;
//# sourceMappingURL=assets.controller.js.map
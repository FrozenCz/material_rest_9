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
let AssetsController = class AssetsController {
    constructor(api) {
        this.api = api;
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
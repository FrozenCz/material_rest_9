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
exports.RightsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const create_rights_dto_1 = require("./dto/create-rights.dto");
const rights_allowed_decorator_1 = require("../guards/rights-allowed.decorator");
const rights_guard_1 = require("../guards/rights.guard");
const rights_list_1 = require("./config/rights.list");
const api_1 = require("../api");
let RightsController = class RightsController {
    constructor(api) {
        this.api = api;
    }
    getRights() {
        return this.api.getRights();
    }
    createRights(createRightsDto) {
        return this.api.createRights(createRightsDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.settingRights),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RightsController.prototype, "getRights", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.setRights),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rights_dto_1.CreateRightsDto]),
    __metadata("design:returntype", Promise)
], RightsController.prototype, "createRights", null);
RightsController = __decorate([
    (0, common_1.Controller)('rights'),
    __metadata("design:paramtypes", [api_1.Api])
], RightsController);
exports.RightsController = RightsController;
//# sourceMappingURL=rights.controller.js.map
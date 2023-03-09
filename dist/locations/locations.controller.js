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
exports.LocationsController = void 0;
const common_1 = require("@nestjs/common");
const create_location_dto_1 = require("./dto/create-location.dto");
const passport_1 = require("@nestjs/passport");
const rights_guard_1 = require("../guards/rights.guard");
const rights_allowed_decorator_1 = require("../guards/rights-allowed.decorator");
const rights_list_1 = require("../users/config/rights.list");
const get_user_decorator_1 = require("../users/utils/get-user.decorator");
const user_entity_1 = require("../users/models/user.entity");
const api_1 = require("../api");
let LocationsController = class LocationsController {
    constructor(api) {
        this.api = api;
    }
    getLocations() {
        return this.api.getLocations();
    }
    createLocation(user, createLocationDto) {
        return this.api.createLocation(createLocationDto, user);
    }
    updateLocation(user, updateLocation, uuid) {
        return this.api.updateLocation(Object.assign(Object.assign({}, updateLocation), { uuid }), user);
    }
    saveNfcId(user, saveNfcId, locationUuid) {
        return this.api.saveNfcId(locationUuid, saveNfcId, user);
    }
    deleteLocation(id) {
        return this.api.deleteLocation(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "getLocations", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.createLocation),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        create_location_dto_1.CreateLocationDto]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "createLocation", null);
__decorate([
    (0, common_1.Patch)('/:uuid'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.createLocation),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(2, (0, common_1.Param)('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        create_location_dto_1.UpdateLocationDto, String]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "updateLocation", null);
__decorate([
    (0, common_1.Patch)('/:uuid/nfc'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.createLocation),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(2, (0, common_1.Param)('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        create_location_dto_1.SaveNfcDTO, String]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "saveNfcId", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "deleteLocation", null);
LocationsController = __decorate([
    (0, common_1.Controller)('/locations'),
    __metadata("design:paramtypes", [api_1.Api])
], LocationsController);
exports.LocationsController = LocationsController;
//# sourceMappingURL=locations.controller.js.map
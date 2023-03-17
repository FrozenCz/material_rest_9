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
exports.UnitsController = void 0;
const common_1 = require("@nestjs/common");
const create_unit_dto_1 = require("./dto/create-unit.dto");
const units_service_1 = require("./units.service");
const get_units_filter_dto_1 = require("./dto/get-units-filter.dto");
const passport_1 = require("@nestjs/passport");
const rights_guard_1 = require("../guards/rights.guard");
const rights_allowed_decorator_1 = require("../guards/rights-allowed.decorator");
const rights_list_1 = require("../users/config/rights.list");
const get_user_decorator_1 = require("../users/utils/get-user.decorator");
const user_entity_1 = require("../users/models/user.entity");
const update_unit_dto_1 = require("./dto/update-unit.dto");
let UnitsController = class UnitsController {
    constructor(unitsService) {
        this.unitsService = unitsService;
    }
    listUnits(getUnitsFilterDto, user) {
        return this.unitsService.listUnits(getUnitsFilterDto, user);
    }
    getAllUnits(user) {
        return this.unitsService.getAllUnits();
    }
    getUnit(id) {
        return this.unitsService.getUnitById(id, true);
    }
    getMasterUnit(id) {
        return this.unitsService.getMasterUnit(id);
    }
    createUnit(createUnitDto, user) {
        return this.unitsService.createUnit(createUnitDto, user);
    }
    editUnit(id, updateUnitDto, user) {
        return this.unitsService.updateUnit(id, updateUnitDto, user);
    }
    deleteUnit(id, user) {
        return this.unitsService.deleteUnit(id, user);
    }
    ableToDelete(id, user) {
        return this.unitsService.ableToDelete(id);
    }
    addManager(idUnit, idUser, user) {
        return this.unitsService.addManager(idUnit, idUser, user);
    }
    removeManager(idUnit, idUser, user) {
        return this.unitsService.removeManager(idUnit, idUser, user);
    }
    getDescendantsById(idUnit) {
        return this.unitsService.getDescendantsById(idUnit);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Query)(common_1.ValidationPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_units_filter_dto_1.GetUnitsFilterDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UnitsController.prototype, "listUnits", null);
__decorate([
    (0, common_1.Get)('/getAllUnits'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UnitsController.prototype, "getAllUnits", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UnitsController.prototype, "getUnit", null);
__decorate([
    (0, common_1.Get)('/:id/master_unit'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UnitsController.prototype, "getMasterUnit", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.createUnits),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_unit_dto_1.CreateUnitDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UnitsController.prototype, "createUnit", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.editUnits),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_unit_dto_1.UpdateUnitDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UnitsController.prototype, "editUnit", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.deleteUnits),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UnitsController.prototype, "deleteUnit", null);
__decorate([
    (0, common_1.Get)('/:id/ableToDelete'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.deleteUnits),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UnitsController.prototype, "ableToDelete", null);
__decorate([
    (0, common_1.Post)('/:idUnit/managers/:idUser'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.addManagerToUnits),
    __param(0, (0, common_1.Param)('idUnit', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('idUser', common_1.ParseIntPipe)),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UnitsController.prototype, "addManager", null);
__decorate([
    (0, common_1.Delete)('/:idUnit/managers/:idUser'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.removeManagerFromUnits),
    __param(0, (0, common_1.Param)('idUnit', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('idUser', common_1.ParseIntPipe)),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UnitsController.prototype, "removeManager", null);
__decorate([
    (0, common_1.Get)('/:idUnit/descendants'),
    __param(0, (0, common_1.Param)('idUnit', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UnitsController.prototype, "getDescendantsById", null);
UnitsController = __decorate([
    (0, common_1.Controller)('units'),
    __metadata("design:paramtypes", [units_service_1.UnitsService])
], UnitsController);
exports.UnitsController = UnitsController;
//# sourceMappingURL=units.controller.js.map
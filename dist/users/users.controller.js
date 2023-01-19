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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const rights_allowed_decorator_1 = require("../guards/rights-allowed.decorator");
const get_user_decorator_1 = require("./utils/get-user.decorator");
const user_entity_1 = require("./models/user.entity");
const create_user_dto_1 = require("./dto/create-user.dto");
const get_users_filter_dto_1 = require("./dto/get-users-filter.dto");
const rights_guard_1 = require("../guards/rights.guard");
const update_user_dto_1 = require("./dto/update-user.dto");
const rights_list_1 = require("./config/rights.list");
const set_user_rights_dto_1 = require("./dto/set-user-rights.dto");
const update_users_dto_1 = require("./dto/update-users.dto");
const api_1 = require("../api");
let UsersController = class UsersController {
    constructor(api) {
        this.api = api;
    }
    createUser(user, createUserDto) {
        return this.api.createUser(createUserDto, user);
    }
    getUsers(user, getUsersFilterDto) {
        return this.api.getUsers(getUsersFilterDto, user);
    }
    getReachableUsers(user) {
        return this.api.getReachableUsers(user);
    }
    getUserById(id) {
        return this.api.getUserById(id);
    }
    updateUser(id, user, updateUserDto) {
        return this.api.updateUser(id, updateUserDto, user);
    }
    updateUsersUnits(user, updateUsersDto) {
        return this.api.updateUsersUnits(updateUsersDto, user);
    }
    deleteUser(id, user) {
        return this.api.deleteUser(id, user);
    }
    setUsersRights(userId, user, setUserRightsDto) {
        var _a, _b;
        if ((!setUserRightsDto.removeRights && !setUserRightsDto.addRights) ||
            (((_a = setUserRightsDto.removeRights) === null || _a === void 0 ? void 0 : _a.length) === 0 &&
                ((_b = setUserRightsDto.addRights) === null || _b === void 0 ? void 0 : _b.length) === 0))
            throw new common_1.BadRequestException('You must specified changes');
        return this.api.setUsersRights(userId, setUserRightsDto, user);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.createUser),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        get_users_filter_dto_1.GetUsersFilterDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('/reachable'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getReachableUsers", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.updateUsersInformation),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User,
        update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.updateUsersInformation),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        update_users_dto_1.UpdateUsersDto]),
    __metadata("design:returntype", Object)
], UsersController.prototype, "updateUsersUnits", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.deleteUser),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Patch)('/:id/rights'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.settingRights),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __param(2, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User,
        set_user_rights_dto_1.SetUserRightsDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "setUsersRights", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [api_1.Api])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map
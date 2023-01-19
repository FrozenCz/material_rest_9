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
exports.UsersFacade = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const rights_service_1 = require("../users/rights.service");
const assets_service_1 = require("../assets/assets.service");
const ws_gateway_1 = require("../websocket/ws.gateway");
const transforms_1 = require("../utils/transforms");
let UsersFacade = class UsersFacade {
    constructor(usersService, rightsService, assetsService, wsGateway) {
        this.usersService = usersService;
        this.rightsService = rightsService;
        this.assetsService = assetsService;
        this.wsGateway = wsGateway;
        this.usersService.countUsers().then((usersCount) => {
            if (!usersCount) {
                console.log('Nenalezeny žádní uživatelé');
                const superAdmin = {
                    username: 'Administrator',
                    password: 'BpKnop123!',
                    name: 'admin',
                    surname: 'hlavni',
                };
                this.usersService.createUser(superAdmin, null, true).then((res) => {
                    console.log('Vytvořen superadmin. Username: Administrator; password: BpKnop123!');
                    this.rightsService.fillRights().finally();
                });
            }
        });
    }
    createUser(createUserDto, user) {
        return Promise.all([
            this.usersService.createUser(createUserDto, user),
            this.getReachableUsersMap(user),
        ]).then(([user, reachableUsers]) => {
            this.wsGateway.wsChanges$.next({
                type: ws_gateway_1.SubscribeMessageEnum.usersUpdate,
                changes: [transforms_1.Transforms.userToUserDto(user, reachableUsers)],
            });
            return user;
        });
    }
    async getUsers(getUsersFilterDto, user) {
        let reachableUsers = new Map();
        if (user) {
            reachableUsers = await this.getReachableUsersMap(user);
        }
        return this.usersService.getUsers(getUsersFilterDto).then((users) => {
            return users.map((u) => {
                return {
                    id: u.id,
                    username: u.username,
                    name: u.name,
                    surname: u.surname,
                    reachable: !!reachableUsers.get(u.id),
                    unit_id: u.unit.id,
                };
            });
        });
    }
    getReachableUsers(user) {
        return this.usersService.getReachableUsers(user);
    }
    getReachableUsersMap(user) {
        return this.getReachableUsers(user).then((users) => {
            const userMap = new Map();
            for (const user of users) {
                userMap.set(user.id, user);
            }
            return userMap;
        });
    }
    getUserById(id) {
        return this.usersService.getUserById(id);
    }
    updateUser(id, updateUserDto, user) {
        return Promise.all([
            this.usersService.updateUser(id, updateUserDto, user),
            this.getReachableUsersMap(user),
        ]).then(([user, users]) => {
            this.wsGateway.wsChanges$.next({
                type: ws_gateway_1.SubscribeMessageEnum.usersUpdate,
                changes: [transforms_1.Transforms.userToUserDto(user, users)],
            });
            return user;
        });
    }
    updateUsersUnits(updateUsersDto, user) {
        return Promise.all([
            this.usersService.updateUsersUnits(updateUsersDto, user),
            this.getReachableUsersMap(user),
        ]).then(([users, reachableUsers]) => {
            this.wsGateway.wsChanges$.next({
                type: ws_gateway_1.SubscribeMessageEnum.usersUpdate,
                changes: users.map((u) => transforms_1.Transforms.userToUserDto(u, reachableUsers)),
            });
        });
    }
    async deleteUser(id, user) {
        const userToDelete = await this.getUserById(id);
        const haveAssets = await this.assetsService.haveSomeAssets(userToDelete);
        if (haveAssets) {
            throw new common_1.HttpException('User have some assets!', 405);
        }
        await Promise.all([
            this.usersService.deleteUser(userToDelete, user),
            this.getReachableUsersMap(user),
        ]).then(([user, users]) => {
            this.wsGateway.wsChanges$.next({
                type: ws_gateway_1.SubscribeMessageEnum.usersDelete,
                changes: [transforms_1.Transforms.userToUserDto(user, users)],
            });
        });
        return;
    }
    setUsersRights(userId, setUserRightsDto, user) {
        return this.usersService
            .setUsersRights(userId, setUserRightsDto, user)
            .then(async (rights) => {
            const reachableUsers = await this.getReachableUsersMap(user);
            const userUpd = await this.getUserById(userId);
            this.wsGateway.wsChanges$.next({
                type: ws_gateway_1.SubscribeMessageEnum.usersUpdate,
                changes: [transforms_1.Transforms.userToUserDto(userUpd, reachableUsers)],
            });
            return rights;
        });
    }
    getRights() {
        return this.rightsService.getRights();
    }
    createRights(createRightsDto) {
        return this.rightsService.createRights(createRightsDto);
    }
    async validateUser(authCredentialsDto) {
        return this.usersService.validateUser(authCredentialsDto);
    }
};
UsersFacade = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        rights_service_1.RightsService,
        assets_service_1.AssetsService,
        ws_gateway_1.WsGateway])
], UsersFacade);
exports.UsersFacade = UsersFacade;
//# sourceMappingURL=users.facade.js.map
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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./models/user.entity");
const units_service_1 = require("../units/units.service");
const rights_service_1 = require("./rights.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(userRepository, unitsService, rightsService) {
        this.userRepository = userRepository;
        this.unitsService = unitsService;
        this.rightsService = rightsService;
    }
    async inScope(userEdited, editedBy) {
        if (userEdited.unit === null && editedBy.unit === null) {
            return true;
        }
        else {
            return await this.unitsService.isManagerInTree(userEdited.unit.id, editedBy);
        }
    }
    async countUsers() {
        return await user_entity_1.User.count();
    }
    async createUser(createUserDto, creator, skipCheck = false) {
        const { name, surname, password, username, unitId } = createUserDto;
        if (!skipCheck &&
            !(await this.unitsService.isManagerInTree(unitId, creator))) {
            throw new common_1.ForbiddenException('Unable to create user!');
        }
        const user = new user_entity_1.User();
        user.username = username;
        user.name = name;
        user.surname = surname;
        user.password = password;
        if (unitId) {
            user.unit = await this.unitsService.getUnitById(unitId);
        }
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPasword(user.password, user.salt);
        try {
            await user.save();
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('Username already exists');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
        if (!user) {
            throw new common_1.InternalServerErrorException('Unable to create user');
        }
        delete user.salt;
        delete user.password;
        return user;
    }
    async getUserById(userId) {
        const found = await user_entity_1.User.findOne({ where: { id: userId } });
        if (!found) {
            throw new common_1.NotFoundException(`User with ID "${userId}" not found!`);
        }
        return found;
    }
    async getUsers(getUsersFilterDto) {
        const { unitId, unitIds } = getUsersFilterDto || {};
        const query = this.userRepository
            .createQueryBuilder('user')
            .addSelect(['user.unit'])
            .leftJoinAndSelect('user.unit', 'units')
            .where('user.id != 1')
            .andWhere('user.active = true');
        if (unitId) {
            query.where('user.unit = :unit', { unit: unitId });
        }
        if (unitIds) {
            query.where('user.unit IN (:...unitIds)', { unitIds });
        }
        const users = await query.getMany();
        return users;
    }
    async updateUser(id, updateUserDto, user) {
        const { name, surname, unitId } = updateUserDto;
        if (!name && !surname && !unitId)
            throw new common_1.BadRequestException('Not specified any changes');
        const userForUpdate = await this.getUserById(id);
        if (name)
            userForUpdate.name = name;
        if (surname)
            userForUpdate.surname = surname;
        if (unitId && (await this.unitsService.isManagerInTree(unitId, user))) {
            userForUpdate.unit = await this.unitsService.getUnitById(unitId);
        }
        const updatedUser = await userForUpdate.save();
        return updatedUser;
    }
    async deleteUser(userToDelete, user) {
        const inScope = await this.inScope(userToDelete, user);
        if (userToDelete && inScope) {
            userToDelete.active = false;
            return user_entity_1.User.save(userToDelete);
        }
        throw new common_1.ForbiddenException('You are not able to delete user from this unit');
    }
    async setUsersRights(userId, setUserRightsDto, user) {
        const editedUser = await this.getUserById(userId);
        const inScope = this.inScope(editedUser, user);
        const { addRights, removeRights } = setUserRightsDto || {};
        if (addRights)
            if (editedUser && inScope) {
                if (addRights && addRights.length > 0) {
                    for (const rightsToAdd of addRights) {
                        const rights = await this.rightsService.getRightsById(rightsToAdd);
                        if (rights && !editedUser.rights.includes(rights)) {
                            editedUser.rights.push(rights);
                        }
                    }
                }
                if (removeRights && removeRights.length > 0) {
                    for (const rightsToRemove of removeRights) {
                        const rights = await this.rightsService.getRightsById(rightsToRemove);
                        if (rights && !!editedUser.rights.find((r) => r.id === rights.id)) {
                            editedUser.rights = editedUser.rights
                                .slice(0)
                                .filter((r) => r.id !== rights.id);
                        }
                    }
                }
                try {
                    const updUser = await editedUser.save();
                    return updUser.rights;
                }
                catch (e) {
                    throw new common_1.InternalServerErrorException('Setting rights failed');
                }
            }
    }
    async updateUsersUnits(updateUsersDto, user) {
        const response = [];
        for (const userChanges of updateUsersDto.changes) {
            const userUpdate = await this.getUserById(userChanges.userId);
            const unit = await this.unitsService.getUnitById(userChanges.unitId);
            if (!(await this.inScope(userUpdate, user))) {
                throw new common_1.ForbiddenException('You are not able to perform that, because you are not in user scope unit');
            }
            if (!(await this.unitsService.isManagerInTree(userChanges.unitId, user))) {
                throw new common_1.ForbiddenException('You are not able to set this unit, because you are not in scope');
            }
            userUpdate.unit = unit;
            const update = await userUpdate.save();
            response.push(update);
        }
        return response;
    }
    async getUnitByUserUnitId(user) {
        return this.unitsService.getUnitById(user.unit.id);
    }
    async getReachableUsers(user) {
        const reachableUnits = await this.unitsService.getDescendants(user.unit);
        return this.getUsers({
            unitIds: reachableUnits.map((unit) => unit.id),
        });
    }
    async getReachableUser(userId, user) {
        const usrs = await this.getReachableUsers(user);
        const reached = usrs.find((user) => user.id === userId);
        if (!reached) {
            throw new common_1.NotFoundException('User not found!');
        }
        return reached;
    }
    async validateUser(authCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository
            .createQueryBuilder('user')
            .addSelect(['user.salt', 'user.password'])
            .leftJoinAndSelect('user.rights', 'rights')
            .leftJoinAndSelect('user.unit', 'units')
            .where('user.username = :username', { username })
            .andWhere('user.active = true')
            .getOne();
        if (user && (await user.validatePassword(password))) {
            return user;
        }
        else {
            return null;
        }
    }
    async hashPasword(pass, salt) {
        return bcrypt.hash(pass, salt);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => units_service_1.UnitsService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => rights_service_1.RightsService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        units_service_1.UnitsService,
        rights_service_1.RightsService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
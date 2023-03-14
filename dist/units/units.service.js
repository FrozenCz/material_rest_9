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
exports.UnitsService = void 0;
const common_1 = require("@nestjs/common");
const unit_entity_1 = require("./unit.entity");
const users_service_1 = require("../users/users.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let UnitsService = class UnitsService {
    constructor(manager, usersService) {
        this.manager = manager;
        this.usersService = usersService;
        this.unitsRepository = this.manager.getTreeRepository(unit_entity_1.Unit);
    }
    async listUnits(getUnitsFilterDto, user) {
        return await this.getUnits(getUnitsFilterDto, user);
    }
    async getUnits(getUnitsFilterDto, user) {
        let parent;
        let units;
        if (getUnitsFilterDto) {
            parent = getUnitsFilterDto.parent;
        }
        if (user && user.unit) {
            parent = user.unit.id;
        }
        if (parent) {
            const ancestor = await this.getUnitById(parent);
            units = await this.unitsRepository.findDescendantsTree(ancestor);
        }
        else {
            units = await this.unitsRepository.findTrees();
        }
        return units;
    }
    async getUnitByIdWithUsers(idUnit) {
        const query = await this.unitsRepository.createQueryBuilder('unit');
        query
            .leftJoinAndSelect('unit.users', 'users')
            .select([
            'unit.id',
            'unit.name',
            'users.id',
            'users.name',
            'users.surname',
        ])
            .where('unit.id = :idUnit', { idUnit });
        const found = query.getOne();
        if (!found) {
            throw new common_1.NotFoundException(`Unit with users that have id "${idUnit}" not found! `);
        }
        return found;
    }
    async getUnitById(id, withUsers) {
        let found;
        if (!withUsers) {
            found = await this.unitsRepository.findOne({ where: { id: id } });
        }
        else {
            found = await this.getUnitByIdWithUsers(id);
            if (found && found.users === undefined) {
                found.users = [];
            }
        }
        if (!found) {
            throw new common_1.NotFoundException(`Unit with ID "${id}" not found!`);
        }
        return found;
    }
    async getMasterUnit(id) {
        const unit = await this.getUnitById(id);
        const roots = await this.unitsRepository.findAncestors(unit);
        if (roots.length === 0)
            return unit;
        return roots.shift();
    }
    async createUnit(createUnitDto, user) {
        let parent;
        if (createUnitDto.parent) {
            parent = await this.unitsRepository.findOne({
                where: { id: createUnitDto.parent },
            });
            if (!parent) {
                throw new common_1.NotFoundException(`Parent with ID "${createUnitDto.parent}" not found! `);
            }
        }
        const nameExists = await this.unitsRepository.findOne({
            where: { name: createUnitDto.name },
        });
        if (nameExists) {
            throw new common_1.ConflictException(`Unit with "${createUnitDto.name}" already exists!`);
        }
        const unit = new unit_entity_1.Unit();
        unit.name = createUnitDto.name;
        unit.parent = parent;
        unit.users = [];
        if (unit.parent === undefined) {
            unit.users.push(user);
        }
        await unit.save();
        const validInformation = ['username'];
        unit.users.map((user) => {
            Object.keys(user).forEach((key) => {
                if (!validInformation.includes(key))
                    delete user[key];
            });
        });
        delete unit.users;
        return unit;
    }
    async deleteUnit(id, user) {
        const isInTree = await this.isManagerInTree(id, user);
        if (!isInTree) {
            throw new common_1.ForbiddenException('You are not able to do that!');
        }
        if (await this.haveUnitUser(id)) {
            throw new common_1.ForbiddenException('Unit have users');
        }
        const unit = await this.getUnitById(id);
        const children = await this.unitsRepository.findDescendants(unit);
        const query = await this.unitsRepository.createDescendantsQueryBuilder('unit', 'unitClosure', unit);
        if (children.length < 1) {
            children.push(unit);
        }
        query
            .delete()
            .from('unit_closure')
            .where('id_descendant IN (:...ids)', { ids: children.map((ch) => ch.id) })
            .execute()
            .catch((err) => console.log(err));
        await this.unitsRepository.remove(children.reverse());
        return;
    }
    async isManagerInTree(unitId, user) {
        if (user.unit === null) {
            return true;
        }
        const unitsTreeParentObject = await this.getAncestors(unitId);
        return unitsTreeParentObject.some((unit) => { var _a; return unit.id === ((_a = user.unit) === null || _a === void 0 ? void 0 : _a.id); });
    }
    async getAncestors(unitId) {
        const unit = await this.getUnitById(unitId);
        return await this.unitsRepository.findAncestors(unit);
    }
    async addManager(idUnit, idUser, user) {
        const unit = await this.getUnitById(idUnit, true);
        const isInTree = await this.isManagerInTree(idUnit, user);
        const userToAdd = await this.usersService.getUserById(idUser);
        if (!isInTree) {
            throw new common_1.ForbiddenException('You are not able to add manager for this unit');
        }
        if (unit.users.find((u) => u.id === idUser)) {
            throw new common_1.ConflictException(`User ID "${idUser}" already exists on unit ID "${idUnit}" `);
        }
        unit.users.push(userToAdd);
        await unit.save();
        return;
    }
    async removeManager(idUnit, idUser, user) {
        const unit = await this.getUnitById(idUnit, true);
        const isInTree = await this.isManagerInTree(idUnit, user);
        if (!isInTree) {
            throw new common_1.ForbiddenException('You are not able to this action!');
        }
        unit.users = unit.users.filter((u) => u.id !== idUser);
        await unit.save();
        return;
    }
    async updateUnit(id, updateUnitDto, user) {
        if (!(await this.isManagerInTree(id, user))) {
            throw new common_1.ForbiddenException('You are not able to perform this action');
        }
        const unit = await this.getUnitById(id);
        try {
            unit.name = updateUnitDto.name;
            await unit.save();
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Problem with update');
        }
        return unit;
    }
    async getDescendants(parent) {
        return await this.unitsRepository.findDescendants(parent);
    }
    async getDescendantsById(parentId) {
        const unit = await this.getUnitById(parentId);
        return this.getDescendants(unit);
    }
    async getAllUnits() {
        return await this.unitsRepository.findTrees();
    }
    async haveUnitUser(unitId) {
        var _a;
        const descendants = await this.getDescendantsById(unitId);
        const have = !!((_a = (await Promise.all([
            ...descendants.map((d) => this.usersService.getUsers({ unitId: d.id })),
        ]))
            .map((d) => d.length)) === null || _a === void 0 ? void 0 : _a.some((d) => d > 0));
        return have;
    }
    async ableToDelete(id) {
        const haveUser = await this.haveUnitUser(id);
        return !haveUser;
    }
    async getMasterUnitByUser(user) {
        return this.getMasterUnit(user.unit.id);
    }
};
UnitsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectEntityManager)()),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [typeorm_2.EntityManager,
        users_service_1.UsersService])
], UnitsService);
exports.UnitsService = UnitsService;
//# sourceMappingURL=units.service.js.map
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
exports.LocationsService = void 0;
const common_1 = require("@nestjs/common");
const location_entity_1 = require("./models/location.entity");
const units_service_1 = require("../units/units.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let LocationsService = class LocationsService {
    constructor(manager, unitsService) {
        this.manager = manager;
        this.unitsService = unitsService;
        this.locationsRepository = this.manager.getTreeRepository(location_entity_1.Location);
    }
    async getLocationById(id) {
        const found = this.locationsRepository.findOne({ where: { uuid: id } });
        if (!found) {
            throw new common_1.NotFoundException(`Location with ID "${id}" not found!`);
        }
        return found;
    }
    async listLocations() {
        return await this.locationsRepository.find({ order: { ord: 'ASC' } });
    }
    async createLocation(createLocationDto, user) {
        var _a;
        let parentLocation;
        let unitScopeMasterUnit;
        const { name, parent = null } = createLocationDto || {};
        if (!((_a = user.unit) === null || _a === void 0 ? void 0 : _a.id)) {
            throw new common_1.ForbiddenException(`You need to be settled to any unit!`);
        }
        if (parent) {
            parentLocation = await this.getLocationById(parent);
            if (!parentLocation) {
                throw new common_1.NotFoundException(`Location with ID "${parent}" not found! `);
            }
            unitScopeMasterUnit = await this.unitsService.getMasterUnit(parentLocation.masterUnit.id);
        }
        else {
            unitScopeMasterUnit = await this.unitsService.getMasterUnitByUser(user);
        }
        const userScopeMasterUnit = await this.unitsService.getMasterUnit(user.unit.id);
        if (userScopeMasterUnit.id !== unitScopeMasterUnit.id) {
            throw new common_1.ForbiddenException(`You are not able to set unit under "${unitScopeMasterUnit}" master unit `);
        }
        const location = new location_entity_1.Location();
        location.name = name;
        location.parent = parentLocation;
        location.masterUnit = unitScopeMasterUnit;
        return await location.save();
    }
    async deleteLocation(id) {
        const location = await this.getLocationById(id);
        const children = await this.locationsRepository.findDescendants(location);
        const query = await this.locationsRepository.createDescendantsQueryBuilder('location', 'locationClosure', location);
        await query
            .delete()
            .from('location_closure')
            .where('uuid_ancestor IN (:...ids)', {
            ids: children.map((ch) => ch.uuid),
        })
            .execute();
        await this.locationsRepository.remove(children.reverse());
    }
    async updateLocation(updateLocation, user) {
        const location = await this.getLocationById(updateLocation.uuid);
        location.name = updateLocation.name;
        return location.save();
    }
    async safeNfcId(locationUuid, saveNfcId) {
        const location = await location_entity_1.Location.findOneOrFail({
            where: { uuid: locationUuid },
        });
        location.nfcId = saveNfcId.nfcId;
        return location.save();
    }
};
LocationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_2.EntityManager,
        units_service_1.UnitsService])
], LocationsService);
exports.LocationsService = LocationsService;
//# sourceMappingURL=locations.service.js.map
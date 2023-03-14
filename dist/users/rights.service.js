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
exports.RightsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rights_entity_1 = require("./models/rights.entity");
const rights_list_1 = require("./config/rights.list");
const user_entity_1 = require("./models/user.entity");
const typeorm_2 = require("typeorm");
let RightsService = class RightsService {
    constructor(rightsRepository) {
        this.rightsRepository = rightsRepository;
    }
    async getRights() {
        return await this.rightsRepository.find();
    }
    async createRights(createRightsDto) {
        const { description, relatedTo, name, tag } = createRightsDto;
        const rights = new rights_entity_1.Rights();
        rights.name = name;
        rights.tag = tag;
        rights.description = description;
        rights.relatedTo = relatedTo;
        try {
            await rights.save();
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
        return rights;
    }
    async countRights() {
        return await this.rightsRepository.count();
    }
    async fillRights() {
        const allRights = rights_list_1.RightsList;
        const admin = await user_entity_1.User.findOne({ where: { id: 1 } });
        if (!admin.rights)
            admin.rights = [];
        allRights.forEach((right) => {
            this.createRights(right)
                .then((rights) => {
                admin.rights.push(rights);
            })
                .then(() => {
                if (admin.rights.length === allRights.length) {
                    admin.save();
                }
            });
        });
    }
    async getRightsById(rightsToAdd) {
        const rights = await this.rightsRepository.findOne({
            where: { id: rightsToAdd },
        });
        if (!rights) {
            throw new common_1.NotFoundException(`Rights with ${rightsToAdd} was not found!`);
        }
        return rights;
    }
};
RightsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rights_entity_1.Rights)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RightsService);
exports.RightsService = RightsService;
//# sourceMappingURL=rights.service.js.map
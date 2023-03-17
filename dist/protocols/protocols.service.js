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
exports.ProtocolsService = void 0;
const common_1 = require("@nestjs/common");
const protocols_entity_1 = require("./models/protocols.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let ProtocolsService = class ProtocolsService {
    constructor(removingProtocolsRepository) {
        this.removingProtocolsRepository = removingProtocolsRepository;
    }
    getRemovingProtocolsList() {
        return this.removingProtocolsRepository.find();
    }
    async createRemovingProtocol(removeAssetsDto, user, transactionManager) {
        const { assets, documentDate, possibleRemovingDate, removingDocumentIdentification, } = removeAssetsDto;
        const protocol = new protocols_entity_1.RemovingProtocol();
        protocol.document = removingDocumentIdentification;
        protocol.documentDate = documentDate;
        protocol.possibleRemovingDate = possibleRemovingDate;
        protocol.assets = assets;
        if (transactionManager) {
            return await transactionManager.save(protocol);
        }
        return protocol.save();
    }
};
ProtocolsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(protocols_entity_1.RemovingProtocol)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ProtocolsService);
exports.ProtocolsService = ProtocolsService;
//# sourceMappingURL=protocols.service.js.map
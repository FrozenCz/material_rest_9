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
var HistoryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryService = void 0;
const common_1 = require("@nestjs/common");
const history_model_1 = require("./models/history.model");
const history_entity_1 = require("./history.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let HistoryService = HistoryService_1 = class HistoryService {
    constructor(historyRepository) {
        this.historyRepository = historyRepository;
    }
    static compareValueDifferences(obj1, obj2) {
        const o1 = JSON.parse(obj1);
        const o2 = JSON.parse(obj2);
        const differencesOn = Object.keys(o1).filter((o) => o1[o] !== o2[o] && typeof o1[o] !== 'object');
        const changedFrom = {};
        const changedTo = {};
        differencesOn.forEach((key) => {
            changedFrom[key] = o1[key];
            changedTo[key] = o2[key];
        });
        return { changedFrom, changedTo };
    }
    async saveHistory(createHistory, user) {
        const history = new history_entity_1.History();
        switch (createHistory.relatedTo) {
            case history_model_1.HistoryRelatedTo.assetsCreate:
                history.asset = createHistory.asset;
                history.changedFrom = '';
                history.changedTo = createHistory.changedTo;
                break;
            case history_model_1.HistoryRelatedTo.assetsChangeInformation:
                history.asset = createHistory.asset;
                const compared = HistoryService_1.compareValueDifferences(createHistory.changedFrom, createHistory.changedTo);
                history.changedFrom = JSON.stringify(compared.changedFrom);
                history.changedTo = JSON.stringify(compared.changedTo);
                break;
            case history_model_1.HistoryRelatedTo.assetsUserChange:
                history.asset = createHistory.asset;
                const userFrom = JSON.parse(createHistory.changedFrom).user;
                const userTo = JSON.parse(createHistory.changedTo).user;
                history.changedFrom = JSON.stringify({
                    userId: userFrom.id,
                    name: userFrom.name,
                    surname: userFrom.surname,
                });
                history.changedTo = JSON.stringify({
                    userId: userTo.id,
                    name: userTo.name,
                    surname: userTo.surname,
                });
                break;
            case history_model_1.HistoryRelatedTo.assetsRemoved:
                history.asset = createHistory.asset;
                history.changedFrom = createHistory.changedFrom;
                history.changedTo = '';
                break;
        }
        history.changedBy = user;
        history.relatedTo = createHistory.relatedTo;
        return await this.historyRepository.save(history);
    }
    async getHistory() {
        return (await this.historyRepository.find({ order: { id: 'DESC' } })).map((history) => this.processHistory(history));
    }
    async getHistoryForAsset(assetId) {
        return (await this.historyRepository.find({
            where: { asset: { id: assetId } },
            order: { id: 'DESC' },
        })).map((history) => this.processHistory(history));
    }
    processHistory(history) {
        const historyDto = {
            id: history.id,
            changedBy: {
                id: history.changedBy.id,
                name: history.changedBy.name,
                surname: history.changedBy.surname,
                unit: {
                    id: history.changedBy.unit.id,
                    name: history.changedBy.unit.name,
                },
            },
            changedFrom: history.changedFrom.length > 2 ? JSON.parse(history.changedFrom) : null,
            changedTo: history.changedTo.length > 2 ? JSON.parse(history.changedTo) : null,
            relatedTo: history.relatedTo,
            created: history.created,
        };
        if (history.asset) {
            historyDto.asset = history.asset;
        }
        if (history.user) {
            historyDto.user = {
                id: history.user.id,
                name: history.user.name,
                surname: history.user.surname,
                unit: {
                    id: history.user.unit.id,
                    name: history.user.unit.name,
                },
            };
        }
        return historyDto;
    }
};
HistoryService = HistoryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(history_entity_1.History)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HistoryService);
exports.HistoryService = HistoryService;
//# sourceMappingURL=history.service.js.map
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
exports.StockTakingItemEntity = void 0;
const typeorm_1 = require("typeorm");
const assets_entity_1 = require("./assets.entity");
const stock_taking_entity_1 = require("./stock-taking.entity");
const location_entity_1 = require("../../locations/models/location.entity");
let StockTakingItemEntity = class StockTakingItemEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], StockTakingItemEntity.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => assets_entity_1.Assets, asset => asset.id, { lazy: true, nullable: true }),
    __metadata("design:type", Promise)
], StockTakingItemEntity.prototype, "asset", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.RelationId)((stockTakingItemEntity) => stockTakingItemEntity.asset),
    __metadata("design:type", Number)
], StockTakingItemEntity.prototype, "assetId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => stock_taking_entity_1.StockTakingEntity, stockTaking => stockTaking.uuid, { lazy: true, nullable: true }),
    __metadata("design:type", Promise)
], StockTakingItemEntity.prototype, "stockTaking", void 0);
__decorate([
    (0, typeorm_1.RelationId)((stockTakingItemEntity) => stockTakingItemEntity.stockTaking),
    __metadata("design:type", String)
], StockTakingItemEntity.prototype, "stockTakingUuid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => location_entity_1.Location, location => location.uuid, { lazy: true, nullable: true }),
    __metadata("design:type", Promise)
], StockTakingItemEntity.prototype, "foundInLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.RelationId)((stockTakingItemEntity) => stockTakingItemEntity.foundInLocation),
    __metadata("design:type", String)
], StockTakingItemEntity.prototype, "foundInLocationUuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp without time zone', nullable: true }),
    __metadata("design:type", Date)
], StockTakingItemEntity.prototype, "foundAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], StockTakingItemEntity.prototype, "note", void 0);
StockTakingItemEntity = __decorate([
    (0, typeorm_1.Entity)('stock_taking_item')
], StockTakingItemEntity);
exports.StockTakingItemEntity = StockTakingItemEntity;
//# sourceMappingURL=stock-taking-item.entity.js.map
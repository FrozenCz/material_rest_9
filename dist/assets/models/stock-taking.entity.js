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
exports.StockTakingEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/models/user.entity");
const stock_taking_item_entity_1 = require("./stock-taking-item.entity");
let StockTakingEntity = class StockTakingEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], StockTakingEntity.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], StockTakingEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.id, { lazy: true, nullable: true }),
    __metadata("design:type", Promise)
], StockTakingEntity.prototype, "solver", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.RelationId)((stockTakingEntity) => stockTakingEntity.solver),
    __metadata("design:type", Number)
], StockTakingEntity.prototype, "solverId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.id, { lazy: true, nullable: true }),
    __metadata("design:type", Promise)
], StockTakingEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, typeorm_1.RelationId)((stockTakingEntity) => stockTakingEntity.author),
    __metadata("design:type", Number)
], StockTakingEntity.prototype, "authorId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => stock_taking_item_entity_1.StockTakingItemEntity, (stockTakingItemEntity) => stockTakingItemEntity.stockTaking, {
        eager: true,
        cascade: true,
    }),
    __metadata("design:type", Array)
], StockTakingEntity.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp without time zone' }),
    __metadata("design:type", Date)
], StockTakingEntity.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp without time zone', nullable: true }),
    __metadata("design:type", Date)
], StockTakingEntity.prototype, "closedAt", void 0);
StockTakingEntity = __decorate([
    (0, typeorm_1.Entity)('stock_taking')
], StockTakingEntity);
exports.StockTakingEntity = StockTakingEntity;
//# sourceMappingURL=stock-taking.entity.js.map
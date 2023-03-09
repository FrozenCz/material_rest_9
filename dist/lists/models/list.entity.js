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
exports.ListEntity = void 0;
const typeorm_1 = require("typeorm");
const assets_entity_1 = require("../../assets/models/assets.entity");
const user_entity_1 = require("../../users/models/user.entity");
let ListEntity = class ListEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ListEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ListEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ListEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], ListEntity.prototype, "connected", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], ListEntity.prototype, "archived", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ListEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp without time zone' }),
    __metadata("design:type", Date)
], ListEntity.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp without time zone' }),
    __metadata("design:type", Date)
], ListEntity.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => assets_entity_1.Assets, object => object.user, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinTable)({
        name: 'assets_for_list',
        joinColumns: [{ name: 'userId' }],
        inverseJoinColumns: [{ name: 'assetId' }],
    }),
    __metadata("design:type", Array)
], ListEntity.prototype, "assets", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.User, user => user.id, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], ListEntity.prototype, "user", void 0);
ListEntity = __decorate([
    (0, typeorm_1.Entity)()
], ListEntity);
exports.ListEntity = ListEntity;
//# sourceMappingURL=list.entity.js.map
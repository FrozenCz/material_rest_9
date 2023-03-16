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
exports.History = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/models/user.entity");
const class_validator_1 = require("class-validator");
const history_model_1 = require("./models/history.model");
const assets_entity_1 = require("../assets/models/assets.entity");
let History = class History extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], History.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.User, user => user.id, { eager: true, cascade: true, onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({
        name: 'changedByUserId'
    }),
    __metadata("design:type", user_entity_1.User)
], History.prototype, "changedBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], History.prototype, "relatedTo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsJSON)(),
    __metadata("design:type", String)
], History.prototype, "changedFrom", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsJSON)(),
    __metadata("design:type", String)
], History.prototype, "changedTo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp without time zone' }),
    __metadata("design:type", Date)
], History.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => user_entity_1.User, user => user.id, { nullable: true, eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], History.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => assets_entity_1.Assets, asset => asset.id, { nullable: true, eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'assetId' }),
    __metadata("design:type", assets_entity_1.Assets)
], History.prototype, "asset", void 0);
History = __decorate([
    (0, typeorm_1.Entity)()
], History);
exports.History = History;
//# sourceMappingURL=history.entity.js.map
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
exports.AssetNote = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/models/user.entity");
const assets_entity_1 = require("./assets.entity");
let AssetNote = class AssetNote extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AssetNote.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp without time zone' }),
    __metadata("design:type", Date)
], AssetNote.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp without time zone' }),
    __metadata("design:type", Date)
], AssetNote.prototype, "updated", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 5000 }),
    __metadata("design:type", String)
], AssetNote.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.User, (user) => user.id, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'userNoteId' }),
    __metadata("design:type", user_entity_1.User)
], AssetNote.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], AssetNote.prototype, "deleted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.User, (user) => user.id, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'deletedByUserId' }),
    __metadata("design:type", user_entity_1.User)
], AssetNote.prototype, "deletedByUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => assets_entity_1.Assets, (asset) => asset.id),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", assets_entity_1.Assets)
], AssetNote.prototype, "asset", void 0);
AssetNote = __decorate([
    (0, typeorm_1.Entity)()
], AssetNote);
exports.AssetNote = AssetNote;
//# sourceMappingURL=assetNote.entity.js.map
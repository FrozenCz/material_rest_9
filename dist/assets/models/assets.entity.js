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
exports.Assets = exports.AssetState = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/models/user.entity");
const category_entity_1 = require("../../categories/models/category.entity");
const protocols_entity_1 = require("../../protocols/models/protocols.entity");
const assetNote_entity_1 = require("./assetNote.entity");
const location_entity_1 = require("../../locations/models/location.entity");
var AssetState;
(function (AssetState) {
    AssetState[AssetState["actual"] = 0] = "actual";
    AssetState[AssetState["removed"] = 1] = "removed";
})(AssetState = exports.AssetState || (exports.AssetState = {}));
let Assets = class Assets extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Assets.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150, nullable: true }),
    __metadata("design:type", String)
], Assets.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({}),
    __metadata("design:type", Number)
], Assets.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Assets.prototype, "serialNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Assets.prototype, "inventoryNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Assets.prototype, "evidenceNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Assets.prototype, "identificationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Assets.prototype, "inquiryDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Assets.prototype, "document", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => location_entity_1.Location, (location) => location.uuid, {
        lazy: true,
        nullable: true,
    }),
    __metadata("design:type", Promise)
], Assets.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.RelationId)((asset) => asset.location),
    __metadata("design:type", String)
], Assets.prototype, "location_uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150, nullable: true }),
    __metadata("design:type", String)
], Assets.prototype, "locationEtc", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 250, nullable: true }),
    __metadata("design:type", String)
], Assets.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Assets.prototype, "inquiryPrice", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.User, (user) => user.id, {
        lazy: true,
        cascade: true,
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Promise)
], Assets.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.RelationId)((asset) => asset.user),
    __metadata("design:type", Number)
], Assets.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => category_entity_1.Category, (category) => category.id, { lazy: true }),
    __metadata("design:type", Promise)
], Assets.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.RelationId)((asset) => asset.category),
    __metadata("design:type", Number)
], Assets.prototype, "category_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: AssetState.actual }),
    __metadata("design:type", Number)
], Assets.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => protocols_entity_1.RemovingProtocol, (removingProtocol) => removingProtocol.id, { nullable: true }),
    __metadata("design:type", protocols_entity_1.RemovingProtocol)
], Assets.prototype, "removingProtocol", void 0);
__decorate([
    (0, typeorm_1.VersionColumn)({ default: 1 }),
    __metadata("design:type", Number)
], Assets.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => assetNote_entity_1.AssetNote, (assetNote) => assetNote.id, {
        cascade: true,
        onUpdate: 'CASCADE',
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'assetNotes',
        referencedColumnName: 'assetNoteId',
    }),
    __metadata("design:type", Array)
], Assets.prototype, "assetNotes", void 0);
Assets = __decorate([
    (0, typeorm_1.Entity)()
], Assets);
exports.Assets = Assets;
//# sourceMappingURL=assets.entity.js.map
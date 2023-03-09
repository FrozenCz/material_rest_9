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
exports.AssetAttachmentType = exports.AssetAttachmentsEntity = void 0;
const attachment_1 = require("../../abstract/attachment");
const assets_entity_1 = require("./assets.entity");
const typeorm_1 = require("typeorm");
let AssetAttachmentsEntity = class AssetAttachmentsEntity extends attachment_1.Attachment {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => assets_entity_1.Assets, (asset) => asset.id, { orphanedRowAction: 'delete' }),
    __metadata("design:type", assets_entity_1.Assets)
], AssetAttachmentsEntity.prototype, "asset", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AssetAttachmentsEntity.prototype, "type", void 0);
AssetAttachmentsEntity = __decorate([
    (0, typeorm_1.Entity)('assets_attachments')
], AssetAttachmentsEntity);
exports.AssetAttachmentsEntity = AssetAttachmentsEntity;
var AssetAttachmentType;
(function (AssetAttachmentType) {
    AssetAttachmentType[AssetAttachmentType["file"] = 0] = "file";
    AssetAttachmentType[AssetAttachmentType["image"] = 1] = "image";
})(AssetAttachmentType = exports.AssetAttachmentType || (exports.AssetAttachmentType = {}));
//# sourceMappingURL=assets-attachment.entity.js.map
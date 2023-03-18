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
exports.AssetAttachmentSubscriber = exports.AssetSubscriber = void 0;
const typeorm_1 = require("typeorm");
const ws_gateway_1 = require("../ws.gateway");
const rxjs_1 = require("rxjs");
const common_1 = require("@nestjs/common");
const assets_entity_1 = require("../../assets/models/assets.entity");
const transforms_1 = require("../../utils/transforms");
const assets_attachment_entity_1 = require("../../assets/models/assets-attachment.entity");
let AssetSubscriber = class AssetSubscriber {
    constructor(wsGateway, dataSource) {
        this.wsGateway = wsGateway;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger('AssetSubscriber');
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return assets_entity_1.Assets;
    }
    async afterInsert(event) {
        this.handleUpdate(event.entity)
            .then(rxjs_1.noop)
            .catch((err) => this.logger.warn(err));
    }
    async afterUpdate(event) {
        this.handleUpdate(event.entity)
            .then(rxjs_1.noop)
            .catch((err) => this.logger.warn(err));
    }
    async afterRemove(event) {
        this.wsGateway.wsChanges$.next({
            type: ws_gateway_1.SubscribeMessageEnum.assetsUpdate,
            changes: null,
        });
    }
    async handleUpdate(entity) {
        this.wsGateway.wsChanges$.next({
            type: ws_gateway_1.SubscribeMessageEnum.assetsUpdate,
            changes: [transforms_1.Transforms.assetToAssetDto(entity)],
        });
    }
};
AssetSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)(),
    __metadata("design:paramtypes", [ws_gateway_1.WsGateway,
        typeorm_1.DataSource])
], AssetSubscriber);
exports.AssetSubscriber = AssetSubscriber;
let AssetAttachmentSubscriber = class AssetAttachmentSubscriber {
    constructor(wsGateway, dataSource) {
        this.wsGateway = wsGateway;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger('AssetAttachmentSubscriber');
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return assets_attachment_entity_1.AssetAttachmentsEntity;
    }
    async afterInsert(event) {
        this.handleUpdate(event.entity)
            .then(rxjs_1.noop)
            .catch((err) => this.logger.warn(err));
    }
    async afterUpdate(event) {
        this.handleUpdate(event.entity)
            .then(rxjs_1.noop)
            .catch((err) => this.logger.warn(err));
    }
    async afterRemove(event) {
        this.wsGateway.wsChanges$.next({
            type: ws_gateway_1.SubscribeMessageEnum.assetsUpdate,
            changes: null,
        });
    }
    async handleUpdate(entity) {
        setTimeout(async () => {
            const assetWithAttachments = await assets_entity_1.Assets.findOne({ where: { id: entity.asset.id } });
            this.wsGateway.wsChanges$.next({
                type: ws_gateway_1.SubscribeMessageEnum.assetsUpdate,
                changes: [transforms_1.Transforms.assetToAssetDto(assetWithAttachments)],
            });
        });
    }
};
AssetAttachmentSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)(),
    __metadata("design:paramtypes", [ws_gateway_1.WsGateway,
        typeorm_1.DataSource])
], AssetAttachmentSubscriber);
exports.AssetAttachmentSubscriber = AssetAttachmentSubscriber;
//# sourceMappingURL=asset.subscriber.js.map
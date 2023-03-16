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
exports.LocationSubscriber = void 0;
const typeorm_1 = require("typeorm");
const location_entity_1 = require("../../locations/models/location.entity");
const ws_gateway_1 = require("../ws.gateway");
const rxjs_1 = require("rxjs");
const common_1 = require("@nestjs/common");
let LocationSubscriber = class LocationSubscriber {
    constructor(wsGateway, dataSource) {
        this.wsGateway = wsGateway;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger('LocationSubscriber');
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return location_entity_1.Location;
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
            type: ws_gateway_1.SubscribeMessageEnum.locationDelete,
            changes: null,
        });
    }
    async handleUpdate(entity) {
        this.wsGateway.wsChanges$.next({
            type: ws_gateway_1.SubscribeMessageEnum.locationUpdate,
            changes: entity,
        });
    }
};
LocationSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)(),
    __metadata("design:paramtypes", [ws_gateway_1.WsGateway,
        typeorm_1.DataSource])
], LocationSubscriber);
exports.LocationSubscriber = LocationSubscriber;
//# sourceMappingURL=location.subscriber.js.map
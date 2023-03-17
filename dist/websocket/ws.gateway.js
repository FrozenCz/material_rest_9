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
exports.WsGateway = exports.SubscribeMessageEnum = exports.ChangeType = void 0;
const websockets_1 = require("@nestjs/websockets");
const rxjs_1 = require("rxjs");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
var ChangeType;
(function (ChangeType) {
    ChangeType[ChangeType["create"] = 0] = "create";
    ChangeType[ChangeType["update"] = 1] = "update";
    ChangeType[ChangeType["delete"] = 2] = "delete";
})(ChangeType = exports.ChangeType || (exports.ChangeType = {}));
var SubscribeMessageEnum;
(function (SubscribeMessageEnum) {
    SubscribeMessageEnum["assetsUpdate"] = "assetsUpdate";
    SubscribeMessageEnum["categoryUpdate"] = "categoryUpdate";
    SubscribeMessageEnum["categoryDelete"] = "categoryDelete";
    SubscribeMessageEnum["usersUpdate"] = "usersUpdate";
    SubscribeMessageEnum["usersDelete"] = "usersDelete";
    SubscribeMessageEnum["locationUpdate"] = "locationUpdate";
    SubscribeMessageEnum["locationDelete"] = "locationDelete";
})(SubscribeMessageEnum = exports.SubscribeMessageEnum || (exports.SubscribeMessageEnum = {}));
let WsGateway = class WsGateway {
    constructor() {
        this.logger = new common_1.Logger('Gateway');
        this.wsChanges$ = new rxjs_1.BehaviorSubject(undefined);
    }
    afterInit(server) {
        this.wsChanges$.subscribe((wsChange) => {
            var _a;
            (_a = this.server) === null || _a === void 0 ? void 0 : _a.emit('changes', { data: wsChange });
        });
    }
    handleConnection(client, ...args) {
        this.logger.log('client connected: ' + client.id);
    }
    handleDisconnect(client) {
        this.logger.log('client disconnected: ' + client.id);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WsGateway.prototype, "server", void 0);
WsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true })
], WsGateway);
exports.WsGateway = WsGateway;
//# sourceMappingURL=ws.gateway.js.map
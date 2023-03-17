"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtocolsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const passport_1 = require("@nestjs/passport");
const protocols_service_1 = require("./protocols.service");
const protocols_controler_1 = require("./protocols.controler");
const protocols_entity_1 = require("./models/protocols.entity");
let ProtocolsModule = class ProtocolsModule {
};
ProtocolsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([protocols_entity_1.RemovingProtocol]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
        ],
        controllers: [protocols_controler_1.ProtocolsControler],
        providers: [protocols_service_1.ProtocolsService],
        exports: [protocols_service_1.ProtocolsService],
    })
], ProtocolsModule);
exports.ProtocolsModule = ProtocolsModule;
//# sourceMappingURL=protocols.module.js.map
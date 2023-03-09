"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsModule = void 0;
const common_1 = require("@nestjs/common");
const assets_service_1 = require("./assets.service");
const typeorm_1 = require("@nestjs/typeorm");
const passport_1 = require("@nestjs/passport");
const categories_module_1 = require("../categories/categories.module");
const users_module_1 = require("../users/users.module");
const units_module_1 = require("../units/units.module");
const protocols_module_1 = require("../protocols/protocols.module");
const history_module_1 = require("../history/history.module");
const ws_module_1 = require("../websocket/ws.module");
const assets_entity_1 = require("./models/assets.entity");
const assetNote_entity_1 = require("./models/assetNote.entity");
const assets_attachment_entity_1 = require("./models/assets-attachment.entity");
const asset_transfers_entity_1 = require("./models/asset-transfers.entity");
let AssetsModule = class AssetsModule {
};
AssetsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([assets_entity_1.Assets, assetNote_entity_1.AssetNote, assets_attachment_entity_1.AssetAttachmentsEntity, asset_transfers_entity_1.AssetTransfersEntity]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            (0, common_1.forwardRef)(() => categories_module_1.CategoriesModule),
            protocols_module_1.ProtocolsModule,
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            units_module_1.UnitsModule,
            history_module_1.HistoryModule,
            ws_module_1.WsModule,
        ],
        controllers: [],
        providers: [assets_service_1.AssetsService],
        exports: [assets_service_1.AssetsService],
    })
], AssetsModule);
exports.AssetsModule = AssetsModule;
//# sourceMappingURL=assets.module.js.map
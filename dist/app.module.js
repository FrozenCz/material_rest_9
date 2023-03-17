"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const units_module_1 = require("./units/units.module");
const categories_module_1 = require("./categories/categories.module");
const locations_module_1 = require("./locations/locations.module");
const assets_module_1 = require("./assets/assets.module");
const lists_module_1 = require("./lists/lists.module");
const protocols_module_1 = require("./protocols/protocols.module");
const history_module_1 = require("./history/history.module");
const ws_module_1 = require("./websocket/ws.module");
const users_controller_1 = require("./users/users.controller");
const rights_controller_1 = require("./users/rights.controller");
const users_facade_1 = require("./facade/users.facade");
const config_1 = require("@nestjs/config");
const api_1 = require("./api");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("./config/jwt.config");
const auth_controller_1 = require("./auth/auth.controller");
const assets_controller_1 = require("./assets/assets.controller");
const assets_facade_1 = require("./facade/assets.facade");
const location_subscriber_1 = require("./websocket/subscribers/location.subscriber");
const locations_controller_1 = require("./locations/locations.controller");
const location_facade_1 = require("./facade/location.facade");
const core_1 = require("@nestjs/core");
const asset_subscriber_1 = require("./websocket/subscribers/asset.subscriber");
const logging_interceptor_1 = require("./logging/logging.interceptor");
const controllers = [
    users_controller_1.UsersController,
    rights_controller_1.RightsController,
    auth_controller_1.AuthController,
    assets_controller_1.AssetsController,
    locations_controller_1.LocationsController,
];
const subscribers = [
    location_subscriber_1.LocationSubscriber,
    asset_subscriber_1.AssetSubscriber,
    asset_subscriber_1.AssetAttachmentSubscriber,
];
const facades = [users_facade_1.UsersFacade, assets_facade_1.AssetsFacade, location_facade_1.LocationFacade];
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: [`.env.${process.env.STAGE}`] }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    name: 'evNest',
                    type: 'postgres',
                    host: configService.get('HOST'),
                    port: +configService.get('PORT'),
                    username: configService.get('DATABASE_USER'),
                    password: configService.get('DATABASE_PASSWORD'),
                    database: configService.get('DATABASE_NAME'),
                    schema: configService.get('DATABASE_SCHEMA'),
                    entities: [__dirname + '/**/*.entity.{ts,js}'],
                    autoLoadEntities: true,
                    synchronize: configService.get('SYNC'),
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register(jwt_config_1.jwtModuleOptions),
            categories_module_1.CategoriesModule,
            locations_module_1.LocationsModule,
            units_module_1.UnitsModule,
            users_module_1.UsersModule,
            assets_module_1.AssetsModule,
            lists_module_1.ListsModule,
            protocols_module_1.ProtocolsModule,
            history_module_1.HistoryModule,
            ws_module_1.WsModule,
        ],
        controllers: [...controllers],
        providers: [api_1.Api, ...facades, ...subscribers, { provide: core_1.APP_INTERCEPTOR, useClass: logging_interceptor_1.LoggingInterceptor }],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
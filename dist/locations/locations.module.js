"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationsModule = void 0;
const common_1 = require("@nestjs/common");
const locations_service_1 = require("./locations.service");
const typeorm_1 = require("@nestjs/typeorm");
const passport_1 = require("@nestjs/passport");
const users_module_1 = require("../users/users.module");
const units_module_1 = require("../units/units.module");
const location_entity_1 = require("./models/location.entity");
let LocationsModule = class LocationsModule {
};
LocationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([location_entity_1.Location]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            users_module_1.UsersModule,
            units_module_1.UnitsModule,
        ],
        controllers: [],
        providers: [locations_service_1.LocationsService],
        exports: [locations_service_1.LocationsService],
    })
], LocationsModule);
exports.LocationsModule = LocationsModule;
//# sourceMappingURL=locations.module.js.map
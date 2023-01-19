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
exports.LocationFacade = void 0;
const common_1 = require("@nestjs/common");
const locations_service_1 = require("../locations/locations.service");
let LocationFacade = class LocationFacade {
    constructor(locationService) {
        this.locationService = locationService;
    }
    getLocations() {
        return this.locationService.listLocations();
    }
    createLocation(createLocationDto, user) {
        return this.locationService.createLocation(createLocationDto, user);
    }
    deleteLocation(id) {
        return this.locationService.deleteLocation(id);
    }
    updateLocation(updateLocation, user) {
        return this.locationService.updateLocation(updateLocation, user);
    }
    safeNfcId(locationUuid, saveNfcId, user) {
        return this.locationService.safeNfcId(locationUuid, saveNfcId, user);
    }
};
LocationFacade = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [locations_service_1.LocationsService])
], LocationFacade);
exports.LocationFacade = LocationFacade;
//# sourceMappingURL=location.facade.js.map
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
exports.PatchStockTakingItemDTO = exports.PatchStockTakingDTO = exports.PatchStockTakingsDTO = exports.CreateStockTakingDTO = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateStockTakingDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateStockTakingDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateStockTakingDTO.prototype, "solverId", void 0);
exports.CreateStockTakingDTO = CreateStockTakingDTO;
class PatchStockTakingsDTO {
}
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PatchStockTakingDTO),
    __metadata("design:type", Array)
], PatchStockTakingsDTO.prototype, "stockTakings", void 0);
exports.PatchStockTakingsDTO = PatchStockTakingsDTO;
class PatchStockTakingDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PatchStockTakingDTO.prototype, "uuid", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PatchStockTakingItemDTO),
    __metadata("design:type", Array)
], PatchStockTakingDTO.prototype, "items", void 0);
exports.PatchStockTakingDTO = PatchStockTakingDTO;
class PatchStockTakingItemDTO {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PatchStockTakingItemDTO.prototype, "uuid", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.ValidateIf)((object, value) => value !== null),
    __metadata("design:type", Date)
], PatchStockTakingItemDTO.prototype, "foundAt", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((object, value) => value !== null),
    __metadata("design:type", String)
], PatchStockTakingItemDTO.prototype, "locationUuid", void 0);
exports.PatchStockTakingItemDTO = PatchStockTakingItemDTO;
//# sourceMappingURL=stock-taking.dto.js.map
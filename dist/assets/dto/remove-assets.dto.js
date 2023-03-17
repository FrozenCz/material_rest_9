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
exports.RemoveAssetsDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class RemoveAssetsDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RemoveAssetsDto.prototype, "removingDocumentIdentification", void 0);
__decorate([
    (0, class_transformer_1.Transform)(value => new Date(value.value)),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], RemoveAssetsDto.prototype, "documentDate", void 0);
__decorate([
    (0, class_transformer_1.Transform)(value => new Date(value.value)),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], RemoveAssetsDto.prototype, "possibleRemovingDate", void 0);
__decorate([
    (0, class_transformer_1.Transform)(array => { var _a; return (_a = array.value) === null || _a === void 0 ? void 0 : _a.map(value => Number(value)); }),
    (0, class_validator_1.IsNumber)(undefined, { each: true }),
    __metadata("design:type", Array)
], RemoveAssetsDto.prototype, "assetsIds", void 0);
exports.RemoveAssetsDto = RemoveAssetsDto;
//# sourceMappingURL=remove-assets.dto.js.map
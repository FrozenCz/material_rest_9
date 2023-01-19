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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const get_categories_filter_dto_1 = require("./dto/get-categories-filter.dto");
const categories_service_1 = require("./categories.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const passport_1 = require("@nestjs/passport");
const rights_guard_1 = require("../guards/rights.guard");
const rights_allowed_decorator_1 = require("../guards/rights-allowed.decorator");
const rights_list_1 = require("../users/config/rights.list");
const user_entity_1 = require("../users/models/user.entity");
const get_user_decorator_1 = require("../users/utils/get-user.decorator");
const update_category_settings_dto_1 = require("./dto/update-category-settings.dto");
const categorySettings_enum_1 = require("./utils/categorySettings.enum");
const update_category_dto_1 = require("./dto/update-category.dto");
let CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    getCategories(getCategriesFilterDto) {
        return this.categoriesService.getCategories(getCategriesFilterDto);
    }
    getCategoriesSettings(typeOfSettings) {
        if (!Object.values(categorySettings_enum_1.CategorySettingsEnum).includes(typeOfSettings)) {
            return new common_1.BadRequestException('typeOfSettings must be one of ' + categorySettings_enum_1.CategorySettingsEnum);
        }
        return this.categoriesService.getColumnSettings(typeOfSettings);
    }
    createCategories(createCategoryDto) {
        return this.categoriesService.createCategory(createCategoryDto);
    }
    updateSettings(updateCategorySettingsDto, user) {
        return this.categoriesService.updateCategorySettingsDto(updateCategorySettingsDto);
    }
    deleteCategory(id, user) {
        return this.categoriesService.deleteCategory(id);
    }
    updateCategory(id, updateCategoryDto, user) {
        return this.categoriesService.updateCategory(Object.assign({ id }, updateCategoryDto), user);
    }
    getDescendantsById(idCategory) {
        return this.categoriesService.getDescendantsById(idCategory);
    }
    isAbleToDelete(idCategory) {
        return this.categoriesService.isAbleToDelete(idCategory);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_categories_filter_dto_1.GetCategoriesFilterDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)('/settings/:typeOfSettings'),
    __param(0, (0, common_1.Param)('typeOfSettings')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "getCategoriesSettings", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.createCategory),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "createCategories", null);
__decorate([
    (0, common_1.Put)('/settings'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.createCategory),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_category_settings_dto_1.UpdateCategorySettingsDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "updateSettings", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.deleteCategory),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "deleteCategory", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), rights_guard_1.RightsGuard),
    (0, rights_allowed_decorator_1.RightsAllowed)(rights_list_1.RightsTag.createCategory),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_category_dto_1.UpdateCategoryDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Get)('/:idCategory/descendants'),
    __param(0, (0, common_1.Param)('idCategory', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getDescendantsById", null);
__decorate([
    (0, common_1.Get)('/:idCategory/isAbleToDelete'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('idCategory', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "isAbleToDelete", null);
CategoriesController = __decorate([
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=categories.controller.js.map
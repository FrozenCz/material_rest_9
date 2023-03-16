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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const category_entity_1 = require("./models/category.entity");
const typeorm_1 = require("@nestjs/typeorm");
const categorySettings_entity_1 = require("./models/categorySettings.entity");
const assets_service_1 = require("../assets/assets.service");
const typeorm_2 = require("typeorm");
const ws_gateway_1 = require("../websocket/ws.gateway");
let CategoriesService = class CategoriesService {
    constructor(manager, categorySettingsRepository, assetsService, wsGateway) {
        this.manager = manager;
        this.categorySettingsRepository = categorySettingsRepository;
        this.assetsService = assetsService;
        this.wsGateway = wsGateway;
        this.categoriesRepository = this.manager.getTreeRepository(category_entity_1.Category);
    }
    async getCategoryById(id) {
        const found = await this.categoriesRepository.findOne({ where: { id } });
        if (!found) {
            throw new common_1.NotFoundException(`Category with ID "${id}" not found!`);
        }
        return found;
    }
    async getCategories(getCategoriesFilterDto) {
        let parent;
        let categories;
        if (getCategoriesFilterDto) {
            parent = getCategoriesFilterDto.parent;
        }
        if (parent) {
            const ancestor = await this.getCategoryById(parent);
            categories = await this.categoriesRepository.findDescendantsTree(ancestor);
        }
        else {
            categories = await this.categoriesRepository.findTrees();
        }
        return categories;
    }
    async createCategory(createCategoryDto) {
        let ancestor;
        const { name, code = null, parent = null } = createCategoryDto || {};
        const nameExists = await this.categoriesRepository.findOne({
            where: { name: name },
        });
        if (nameExists) {
            throw new common_1.ConflictException(`Category with "${name}" name already exists!`);
        }
        if (parent) {
            ancestor = await this.categoriesRepository.findOne({
                where: { id: parent },
            });
            if (!ancestor) {
                throw new common_1.NotFoundException(`Category with ID "${parent}" not found`);
            }
        }
        const category = new category_entity_1.Category();
        category.name = name;
        category.code = code;
        category.parent = ancestor;
        const newCat = await category.save();
        this.wsGateway.wsChanges$.next({
            type: ws_gateway_1.SubscribeMessageEnum.categoryUpdate,
            changes: newCat,
        });
        return newCat;
    }
    async deleteCategory(id) {
        const category = await this.getCategoryById(id);
        if (!(await this.isAbleToDelete(id))) {
            throw new common_1.ForbiddenException('Unable to delete category!');
        }
        const children = await this.categoriesRepository.findDescendants(category);
        const query = await this.categoriesRepository.createDescendantsQueryBuilder('category', 'categoryClosure', category);
        if (children.length < 1) {
            children.push(category);
        }
        query
            .delete()
            .from('category_closure')
            .where('id_descendant IN (:...ids)', { ids: children.map((ch) => ch.id) })
            .execute()
            .catch((err) => console.log(err));
        await this.categoriesRepository
            .remove(children.reverse())
            .then((removed) => {
            this.wsGateway.wsChanges$.next({
                changes: id,
                type: ws_gateway_1.SubscribeMessageEnum.categoryDelete,
            });
        });
        return;
    }
    async updateCategorySettingsDto(updateCategorySettingsDto) {
        const found = await this.categorySettingsRepository.findOne({
            where: { name: updateCategorySettingsDto.name },
        });
        if (found) {
            found.config = updateCategorySettingsDto.config;
            await found.save();
        }
        else {
            const newOne = new categorySettings_entity_1.CategorySettings();
            newOne.name = updateCategorySettingsDto.name;
            newOne.config = updateCategorySettingsDto.config;
            await newOne.save();
        }
    }
    async getColumnSettings(typeOfSettings) {
        return await this.categorySettingsRepository.findOne({
            where: { name: typeOfSettings },
        });
    }
    async getDescendants(parent) {
        return await this.categoriesRepository.findDescendants(parent);
    }
    async getDescendantsById(parentId) {
        const category = await this.getCategoryById(parentId);
        return this.getDescendants(category);
    }
    async isAbleToDelete(idCategory) {
        const assetsList = await this.assetsService.getAssetsList();
        const categories = await this.getDescendantsById(idCategory);
        return !assetsList
            .map((asset) => asset.category_id)
            .some((assetCategoryId) => categories.map((category) => category.id).includes(assetCategoryId));
    }
    async updateCategory(updatedCategory, user) {
        const category = await this.getCategoryById(updatedCategory.id);
        category.name = updatedCategory.name;
        category.code = updatedCategory.code;
        const updated = await category.save();
        this.wsGateway.wsChanges$.next({
            type: ws_gateway_1.SubscribeMessageEnum.categoryUpdate,
            changes: updated,
        });
        return updated;
    }
};
CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectEntityManager)()),
    __param(1, (0, typeorm_1.InjectRepository)(categorySettings_entity_1.CategorySettings)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => assets_service_1.AssetsService))),
    __metadata("design:paramtypes", [typeorm_2.EntityManager,
        typeorm_2.Repository,
        assets_service_1.AssetsService,
        ws_gateway_1.WsGateway])
], CategoriesService);
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map
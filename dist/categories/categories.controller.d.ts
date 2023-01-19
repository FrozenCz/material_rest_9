import { BadRequestException } from "@nestjs/common";
import { GetCategoriesFilterDto } from "./dto/get-categories-filter.dto";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { Category } from "./models/category.entity";
import { User } from "../users/models/user.entity";
import { UpdateCategorySettingsDto } from './dto/update-category-settings.dto';
import { CategorySettingsEnum } from './utils/categorySettings.enum';
import { UpdateCategoryDto } from "./dto/update-category.dto";
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    getCategories(getCategriesFilterDto: GetCategoriesFilterDto): Promise<Category[]>;
    getCategoriesSettings(typeOfSettings: CategorySettingsEnum): BadRequestException | Promise<import("./models/categorySettings.entity").CategorySettings>;
    createCategories(createCategoryDto: CreateCategoryDto): Promise<Category>;
    updateSettings(updateCategorySettingsDto: UpdateCategorySettingsDto, user: User): Promise<void>;
    deleteCategory(id: number, user: User): Promise<void>;
    updateCategory(id: number, updateCategoryDto: UpdateCategoryDto, user: User): Promise<Category>;
    getDescendantsById(idCategory: number): Promise<Category[]>;
    isAbleToDelete(idCategory: number): Promise<boolean>;
}

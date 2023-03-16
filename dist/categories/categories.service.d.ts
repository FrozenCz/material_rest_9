import { GetCategoriesFilterDto } from './dto/get-categories-filter.dto';
import { Category } from './models/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategorySettingsDto } from './dto/update-category-settings.dto';
import { CategorySettingsEnum } from './utils/categorySettings.enum';
import { CategorySettings } from './models/categorySettings.entity';
import { AssetsService } from '../assets/assets.service';
import { User } from '../users/models/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { WsGateway } from "../websocket/ws.gateway";
export declare class CategoriesService {
    private manager;
    private categorySettingsRepository;
    private assetsService;
    private wsGateway;
    private categoriesRepository;
    constructor(manager: EntityManager, categorySettingsRepository: Repository<CategorySettings>, assetsService: AssetsService, wsGateway: WsGateway);
    getCategoryById(id: number): Promise<Category>;
    getCategories(getCategoriesFilterDto: GetCategoriesFilterDto): Promise<Category[]>;
    createCategory(createCategoryDto: CreateCategoryDto): Promise<Category>;
    deleteCategory(id: number): Promise<void>;
    updateCategorySettingsDto(updateCategorySettingsDto: UpdateCategorySettingsDto): Promise<void>;
    getColumnSettings(typeOfSettings: CategorySettingsEnum): Promise<CategorySettings>;
    getDescendants(parent: Category): Promise<Category[]>;
    getDescendantsById(parentId: number): Promise<Category[]>;
    isAbleToDelete(idCategory: number): Promise<boolean>;
    updateCategory(updatedCategory: Partial<Category>, user: User): Promise<Category>;
}

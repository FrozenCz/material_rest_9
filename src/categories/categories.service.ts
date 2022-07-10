import {
  ConflictException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GetCategoriesFilterDto } from './dto/get-categories-filter.dto';
import { Category } from './models/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategorySettingsDto } from './dto/update-category-settings.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategorySettingsEnum } from './utils/categorySettings.enum';
import { CategorySettings } from './models/categorySettings.entity';
import { AssetsService } from '../assets/assets.service';
import { SubscribeMessageEnum, WsGateway } from '../ws.gateway';
import { User } from '../users/models/user.entity';
import { Repository, TreeRepository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: TreeRepository<Category>,
    @InjectRepository(CategorySettings)
    private categorySettingsRepository: Repository<CategorySettings>,
    @Inject(forwardRef(() => AssetsService))
    private assetsService: AssetsService,
    private wsGateway: WsGateway,
  ) {}

  async getCategoryById(id: number): Promise<Category> {
    const found = await this.categoriesRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Category with ID "${id}" not found!`);
    }

    return found;
  }

  /**
   * vraci strom kategorii, pokud je parametr vyplnen, vraci pouze strukturu pod
   * @param getCategoriesFilterDto
   */
  async getCategories(
    getCategoriesFilterDto: GetCategoriesFilterDto,
  ): Promise<Category[]> {
    let parent;
    let categories;

    if (getCategoriesFilterDto) {
      parent = getCategoriesFilterDto.parent;
    }

    if (parent) {
      const ancestor = await this.getCategoryById(parent);
      categories = await this.categoriesRepository.findDescendantsTree(
        ancestor,
      );
    } else {
      categories = await this.categoriesRepository.findTrees();
    }

    return categories;
  }

  /**
   * tvorba kategorie
   * @param createCategoryDto
   */
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    let ancestor;
    const { name, code = null, parent = null } = createCategoryDto || {};

    const nameExists = await this.categoriesRepository.findOne({
      where: { name: name },
    });
    // todo podivat se jak to vyresit
    // const nameExists = await this.categoriesRepository.findOne({where: {name: name, parent: parent}})

    if (nameExists) {
      throw new ConflictException(
        `Category with "${name}" name already exists!`,
      );
    }

    if (parent) {
      ancestor = await this.categoriesRepository.findOne({
        where: { id: parent },
      });
      if (!ancestor) {
        throw new NotFoundException(`Category with ID "${parent}" not found`);
      }
    }

    const category = new Category();
    category.name = name;
    category.code = code;
    category.parent = ancestor;
    const newCat = await category.save();
    this.wsGateway.wsChanges$.next({
      type: SubscribeMessageEnum.categoryUpdate,
      changes: newCat,
    });
    return newCat;
  }

  /**
   * smazani kategorie a veskerych kategorii pod ni
   * @param id
   */
  async deleteCategory(id: number): Promise<void> {
    const category = await this.getCategoryById(id);

    if (!(await this.isAbleToDelete(id))) {
      throw new ForbiddenException('Unable to delete category!');
    }

    const children: Category[] =
      await this.categoriesRepository.findDescendants(category);

    /**
     * prvne musim odstranit zavislosti
     */
    const query = await this.categoriesRepository.createDescendantsQueryBuilder(
      'category',
      'categoryClosure',
      category,
    );

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
          type: SubscribeMessageEnum.categoryDelete,
        });
      });
    return;
  }

  //TODO: moveCategory?
  async updateCategorySettingsDto(
    updateCategorySettingsDto: UpdateCategorySettingsDto,
  ): Promise<void> {
    const found = await this.categorySettingsRepository.findOne({
      where: { name: updateCategorySettingsDto.name },
    });
    if (found) {
      found.config = updateCategorySettingsDto.config;
      await found.save();
    } else {
      const newOne = new CategorySettings();
      newOne.name = updateCategorySettingsDto.name;
      newOne.config = updateCategorySettingsDto.config;
      await newOne.save();
    }
  }

  async getColumnSettings(
    typeOfSettings: CategorySettingsEnum,
  ): Promise<CategorySettings> {
    return await this.categorySettingsRepository.findOne({
      where: { name: typeOfSettings },
    });
  }

  async getDescendants(parent: Category): Promise<Category[]> {
    return await this.categoriesRepository.findDescendants(parent);
  }

  async getDescendantsById(parentId: number): Promise<Category[]> {
    const category = await this.getCategoryById(parentId);
    return this.getDescendants(category);
  }

  async isAbleToDelete(idCategory: number): Promise<boolean> {
    const assetsList = await this.assetsService.getAssetsList();
    const categories = await this.getDescendantsById(idCategory);

    return !assetsList
      .map((asset) => asset.category.id)
      .some((assetCategoryId) =>
        categories.map((category) => category.id).includes(assetCategoryId),
      );
  }

  async updateCategory(
    updatedCategory: Partial<Category>,
    user: User,
  ): Promise<Category> {
    const category = await this.getCategoryById(updatedCategory.id);
    category.name = updatedCategory.name;
    category.code = updatedCategory.code;
    const updated = await category.save();
    this.wsGateway.wsChanges$.next({
      type: SubscribeMessageEnum.categoryUpdate,
      changes: updated,
    });
    return updated;
  }
}

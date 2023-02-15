import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { GetCategoriesFilterDto } from './dto/get-categories-filter.dto';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './models/category.entity';
import { AuthGuard } from '@nestjs/passport';
import { RightsGuard } from '../guards/rights.guard';
import { RightsAllowed } from '../guards/rights-allowed.decorator';
import { RightsTag } from '../users/config/rights.list';
import { User } from '../users/models/user.entity';
import { GetUser } from '../users/utils/get-user.decorator';
import { UpdateCategorySettingsDto } from './dto/update-category-settings.dto';
import { CategorySettingsEnum } from './utils/categorySettings.enum';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories(
    @Query(ValidationPipe) getCategriesFilterDto: GetCategoriesFilterDto,
  ) {
    return this.categoriesService.getCategories(getCategriesFilterDto);
  }

  @Get('/settings/:typeOfSettings')
  getCategoriesSettings(
    @Param('typeOfSettings') typeOfSettings: CategorySettingsEnum,
  ) {
    if (!Object.values(CategorySettingsEnum).includes(typeOfSettings)) {
      return new BadRequestException(
        'typeOfSettings must be one of ' + CategorySettingsEnum,
      );
    }
    return this.categoriesService.getColumnSettings(typeOfSettings);
  }

  @Post()
  @UseGuards(AuthGuard(), RightsGuard)
  @RightsAllowed(RightsTag.createCategory)
  createCategories(
    @Body(ValidationPipe) createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Put('/settings')
  @UseGuards(AuthGuard(), RightsGuard)
  @RightsAllowed(RightsTag.createCategory)
  updateSettings(
    @Body(ValidationPipe) updateCategorySettingsDto: UpdateCategorySettingsDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.categoriesService.updateCategorySettingsDto(
      updateCategorySettingsDto,
    );
  }

  @Delete('/:id')
  @UseGuards(AuthGuard(), RightsGuard)
  @RightsAllowed(RightsTag.deleteCategory)
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.categoriesService.deleteCategory(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard(), RightsGuard)
  @RightsAllowed(RightsTag.createCategory)
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateCategoryDto: UpdateCategoryDto,
    @GetUser() user: User,
  ): Promise<Category> {
    return this.categoriesService.updateCategory(
      { id, ...updateCategoryDto },
      user,
    );
  }

  @Get('/:idCategory/descendants')
  getDescendantsById(
    @Param('idCategory', ParseIntPipe) idCategory: number,
  ): Promise<Category[]> {
    return this.categoriesService.getDescendantsById(idCategory);
  }

  @Get('/:idCategory/isAbleToDelete')
  @UseGuards(AuthGuard())
  isAbleToDelete(
    @Param('idCategory', ParseIntPipe) idCategory: number,
  ): Promise<boolean> {
    return this.categoriesService.isAbleToDelete(idCategory);
  }
}

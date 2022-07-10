import { forwardRef, Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { CategoriesService } from './categories.service';
import { AssetsModule } from '../assets/assets.module';
import { WsModule } from '../websocket/ws.module';
import { Category } from './models/category.entity';
import { CategorySettings } from './models/categorySettings.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, CategorySettings]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => AssetsModule),
    WsModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}

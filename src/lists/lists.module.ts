import { Module } from '@nestjs/common';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';
import { PassportModule } from '@nestjs/passport';
import { AssetsModule } from '../assets/assets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListEntity } from './models/list.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AssetsModule,
    TypeOrmModule.forFeature([ListEntity]),
  ],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}

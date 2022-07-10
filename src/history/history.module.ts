import { Module } from '@nestjs/common';
import {HistoryService} from './history.service';
import {HistoryController} from './history.controller';
import {PassportModule} from '@nestjs/passport';
import {TypeOrmModule} from '@nestjs/typeorm';
import { History } from "./history.entity";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([History]),
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}

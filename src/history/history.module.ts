import { Module } from '@nestjs/common';
import {HistoryService} from './history.service';
import {HistoryController} from './history.controller';
import {PassportModule} from '@nestjs/passport';
import {TypeOrmModule} from '@nestjs/typeorm';
import {HistoryRepository} from './repostitories/history.repository';

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        TypeOrmModule.forFeature([HistoryRepository]),
    ],
    controllers: [HistoryController],
    providers: [HistoryService],
    exports: [HistoryService]
})
export class HistoryModule {}

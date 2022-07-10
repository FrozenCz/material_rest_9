import {Controller, Get, Param, ParseIntPipe} from '@nestjs/common';
import {HistoryService} from './history.service';
import {HistoryDto} from './models/history.model';


@Controller('history')
export class HistoryController {


    constructor(private historyService: HistoryService) {
    }

    @Get()
    getHistory(): Promise<HistoryDto[]> {
        return this.historyService.getHistory();
    }

    @Get('/assets/:id')
    getHistoryForAsset(@Param('id', ParseIntPipe) assetId: number): Promise<HistoryDto[]> {
        return this.historyService.getHistoryForAsset(assetId);
    }



}

import { HistoryService } from './history.service';
import { HistoryDto } from './models/history.model';
export declare class HistoryController {
    private historyService;
    constructor(historyService: HistoryService);
    getHistory(): Promise<HistoryDto[]>;
    getHistoryForAsset(assetId: number): Promise<HistoryDto[]>;
}

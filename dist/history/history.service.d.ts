import { CreateHistory, HistoryDto } from './models/history.model';
import { History } from './history.entity';
import { User } from '../users/models/user.entity';
import { Repository } from 'typeorm';
export declare class HistoryService {
    private historyRepository;
    constructor(historyRepository: Repository<History>);
    private static compareValueDifferences;
    saveHistory(createHistory: CreateHistory, user: User): Promise<History>;
    getHistory(): Promise<HistoryDto[]>;
    getHistoryForAsset(assetId: number): Promise<HistoryDto[]>;
    private processHistory;
}

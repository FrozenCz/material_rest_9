import { StockTakingEntity } from './models/stock-taking.entity';
import { User } from '../users/models/user.entity';
import { Assets } from './models/assets.entity';
export declare class StockTakingService {
    getStockTaking(): Promise<StockTakingEntity[]>;
    createStockTaking(param: {
        name: string;
        solverId: number;
        user: User;
        assets: Assets[];
    }): Promise<StockTakingEntity>;
    private prepareItems;
}

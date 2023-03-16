import { BaseEntity } from "typeorm";
import { Assets } from "./assets.entity";
import { StockTakingEntity } from "./stock-taking.entity";
import { Location } from "../../locations/models/location.entity";
export declare class StockTakingItemEntity extends BaseEntity {
    uuid: string;
    asset: Promise<Assets>;
    assetId: number;
    stockTaking: Promise<StockTakingEntity>;
    stockTakingUuid: string;
    foundInLocation: Promise<Location>;
    foundInLocationUuid: string;
    foundAt: Date | null;
    note: string;
}

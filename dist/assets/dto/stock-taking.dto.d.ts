export declare class CreateStockTakingDTO {
    name: string;
    solverId: number;
}
export interface StockTakingInProgressDTO {
    uuid: string;
    name: string;
    items: StockTakingItemDTO[];
}
export interface StockTakingItemDTO {
    uuid: string;
    id: number;
    name: string;
    location: {
        name: string;
        uuid: string;
        nfcId: string;
    };
    serialNumber: string;
}
export declare class PatchStockTakingsDTO {
    stockTakings: PatchStockTakingDTO[];
}
export declare class PatchStockTakingDTO {
    uuid: string;
    items: PatchStockTakingItemDTO[];
}
export declare class PatchStockTakingItemDTO {
    uuid: string;
    foundAt: Date | null;
    locationUuid: string;
}
export interface PatchStockTakingItem {
    uuid: string;
    foundAt: Date | null;
    locationUuid: string;
}

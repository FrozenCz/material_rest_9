import { IsNumber, IsString } from 'class-validator';

export class CreateStockTakingDTO {
  @IsString()
  name: string;

  @IsNumber()
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


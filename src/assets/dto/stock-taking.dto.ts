import { IsArray, IsISSN, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

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

export class PatchStockTakingsDTO {

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => PatchStockTakingDTO)
  stockTakings: PatchStockTakingDTO[];

}

export class PatchStockTakingDTO {

  @IsString()
  uuid: string;

  @IsArray()
  @ValidateNested({each: true})
  @Type(() => PatchStockTakingItemDTO)
  items: PatchStockTakingItemDTO[];

}

export class PatchStockTakingItemDTO {

  @IsString()
  uuid: string;

  @IsOptional()
  foundAt: Date | null

  @IsOptional()
  locationUuid: string;
}

export interface PatchStockTakingItem {
  uuid: string;
  foundAt: Date | null;
  locationUuid: string;
}

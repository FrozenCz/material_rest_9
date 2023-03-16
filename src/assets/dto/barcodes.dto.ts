import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class BarcodesChangesDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AssetChangeDTO)
  assets: AssetChangeDTO[];
}



export class AssetChangeDTO {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  locationConfirmedUuid: string;
}

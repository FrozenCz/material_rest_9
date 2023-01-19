import { Transform } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  ValidateIf,
} from 'class-validator';

export class ChangeAssetInformationBulkDto {
  @Transform((value) => Number(value.value))
  @IsInt()
  assetId: number;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  serialNumber: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  inventoryNumber: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  evidenceNumber: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  identificationNumber: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  note: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  location_uuid: string | null;
}

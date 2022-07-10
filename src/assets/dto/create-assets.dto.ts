import { IsDate, IsDecimal, IsInt, IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator";
import { Transform } from "class-transformer";


export class CreateAssetsDto {

  @Transform(value => Number(value.value))
  @IsInt()
  categoryId: number;

  @Transform(value => Number(value.value))
  @Min(1)
  @IsInt()
  quantity: number;

  @Transform(value => Number(value.value))
  @IsInt()
  userId: number;

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
  @Transform(value => new Date(value.value))
  @IsDate()
  inquiryDate: Date;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  document: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  location: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  locationEtc: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  note: string;

  @IsOptional()
  @Transform(value => Number(value.value))
  @IsNumber()
  inquiryPrice: number;


}

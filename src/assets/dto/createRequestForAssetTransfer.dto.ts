import { ArrayMinSize, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRequestForAssetTransferDto {
  @IsNumber()
  fromUser: number;

  @IsNumber()
  toUser: number;

  @IsNumber(undefined, { each: true })
  @ArrayMinSize(1)
  assetIds: number[];

  @IsString()
  @IsOptional()
  message: string;
}

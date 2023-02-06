import { IsArray, IsNumber } from 'class-validator';

export class CreateRequestForAssetTransferDto {
  @IsNumber()
  fromUser: number;

  @IsNumber()
  toUser: number;

  @IsNumber(undefined, { each: true })
  assetIds: number[];
}

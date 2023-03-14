import { IsNumber, IsString } from 'class-validator';

export class CreateStockTakingDTO {
  @IsString()
  name: string;

  @IsNumber()
  solverId: number;
}

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  parent: string;
}

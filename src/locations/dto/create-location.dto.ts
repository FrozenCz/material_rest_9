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

export class UpdateLocationDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export interface UpdateLocation {
  name: string;
  uuid: string;
}

export class SaveNfcDTO {
  @IsString()
  nfcId: string;
}

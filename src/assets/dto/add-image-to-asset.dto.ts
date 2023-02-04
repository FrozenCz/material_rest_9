import { IsBase64, IsString } from 'class-validator';

export class AddImageToAssetDto {
  @IsString()
  filename: string;

  // @IsBase64()
  base64: string;
}

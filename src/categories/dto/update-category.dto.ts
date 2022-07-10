import {IsOptional, IsString, MaxLength, MinLength} from "class-validator";

export class UpdateCategoryDto {

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    name: string

    @IsOptional()
    @IsString()
    @MaxLength(20)
    code?: string

}
import {IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength} from "class-validator";
import {Transform} from "class-transformer";

export class CreateCategoryDto {

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    name: string

    @IsOptional()
    @IsString()
    @MaxLength(20)
    code?: string

    @IsOptional()
    @IsNotEmpty()
    @Transform(value => Number(value.value))
    @IsInt()
    parent?: number
}

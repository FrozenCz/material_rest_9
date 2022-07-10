import {IsInt, IsNotEmpty, IsOptional} from "class-validator";
import {Transform} from "class-transformer";


export class GetCategoriesFilterDto {

    @IsOptional()
    @IsNotEmpty()
    @Transform(value => Number(value.value))
    @IsInt()
    parent?: number;
}

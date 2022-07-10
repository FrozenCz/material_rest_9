import {IsInt, IsNotEmpty, IsOptional} from "class-validator";
import {Transform} from "class-transformer";

export class GetUnitsFilterDto {

    @IsOptional()
    @IsNotEmpty()
    @Transform(value => Number(value))
    @IsInt()
    parent?: number;

}

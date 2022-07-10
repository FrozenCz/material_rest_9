import {IsInt, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {Transform} from "class-transformer";


export class CreateUnitDto {

    @IsString()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @Transform(value => Number(value.value))
    @IsInt()
    parent?: number;

}

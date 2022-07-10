import {IsInt, IsNotEmpty, IsOptional} from "class-validator";
import {Transform} from 'class-transformer';


export class UpdateUserDto {

    @IsOptional()
    name?: string;

    @IsOptional()
    surname?: string;

    @IsOptional()
    @IsNotEmpty()
    @Transform(value => Number(value.value))
    @IsInt()
    unitId?: number;


}

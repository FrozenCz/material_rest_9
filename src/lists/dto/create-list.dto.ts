import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength
} from 'class-validator';
import {Transform} from 'class-transformer';


export class CreateListDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    category: string;

    @IsOptional()
    @IsString()
    @MaxLength(1000)
    description: string;

    @IsBoolean()
    connected: boolean;

    @IsBoolean()
    archived: boolean;


    @IsArray()
    @IsNotEmpty()
    @Transform(value => value.value?.map(val => Number(val)), {})
    @IsNumber(undefined, {each: true})
    assetsIds: number[];

}

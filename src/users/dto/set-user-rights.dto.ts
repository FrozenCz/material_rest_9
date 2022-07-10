import { IsNumber, IsOptional} from "class-validator";
import {Transform} from 'class-transformer';


export class SetUserRightsDto {

    @IsOptional()
    @Transform(value => value.value?.map(val => Number(val)), {})
    @IsNumber(undefined, {each: true})
    addRights?: number[];

    @IsOptional()
    @Transform(value => value.value?.map(val => Number(val)), {})
    @IsNumber(undefined, {each: true})
    removeRights?: number[];
}

import {IsDate, IsNumber, IsOptional, IsString} from 'class-validator';
import {Transform} from 'class-transformer';


export class RemoveAssetsDto {

    @IsString()
    removingDocumentIdentification: string;

    @Transform(value => new Date(value.value))
    @IsDate()
    documentDate: Date;

    @Transform(value => new Date(value.value))
    @IsDate()
    possibleRemovingDate: Date;

    @Transform(array => array.value?.map(value => Number(value)))
    @IsNumber(undefined, {each: true})
    assetsIds: number[];

}

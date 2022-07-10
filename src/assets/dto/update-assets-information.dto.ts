import {IsDate, IsDecimal, IsInt, IsNumber, IsOptional, IsSemVer, IsString, Max, MaxLength} from 'class-validator';
import {Transform} from 'class-transformer';


export class UpdateAssetsInformationDto {

    @IsOptional()
    @MaxLength(150)
    name: string

    @IsOptional()
    @Transform(value => Number(value.value))
    @IsInt()
    quantity?: number

    @IsOptional()
    @MaxLength(50)
    serialNumber: string

    @IsOptional()
    @MaxLength(50)
    inventoryNumber: string;

    @IsOptional()
    @MaxLength(50)
    evidenceNumber: string;

    @IsOptional()
    @MaxLength(50)
    identificationNumber: string;

    @IsOptional()
    @Transform(value => new Date(value.value))
    @IsDate()
    inquiryDate?: Date;

    @IsOptional()
    @MaxLength(20)
    document?: string

    @IsOptional()
    @MaxLength(250)
    note: string

    @IsOptional()
    @Transform(value => Number(value.value))
    @IsNumber()
    inquiryPrice?: number
}

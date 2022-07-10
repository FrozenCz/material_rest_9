import {IsString} from 'class-validator';


export class UpdateUnitDto {

    @IsString()
    name: string;
}

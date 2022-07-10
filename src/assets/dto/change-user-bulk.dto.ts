import {Transform} from 'class-transformer';
import {IsInt} from 'class-validator';


export class ChangeUserBulkDto {

    @Transform(value => Number(value.value))
    @IsInt()
    assetId: number;

    @Transform(value => Number(value.value))
    @IsInt()
    newUserId: number;

}

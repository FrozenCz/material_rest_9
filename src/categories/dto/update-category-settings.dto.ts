import {IsJSON, IsString, MaxLength, MinLength} from 'class-validator';
import {CategorySettingsEnum} from '../utils/categorySettings.enum';


export class UpdateCategorySettingsDto {

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    name: CategorySettingsEnum;

    @IsJSON()
    config: string;
}

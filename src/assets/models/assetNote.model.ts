import {CreateAssetNoteDto} from '../dto/create-asset-note.dto';
import {Transform} from 'class-transformer';
import {IsInt} from 'class-validator';


export class CreateAssetNote extends CreateAssetNoteDto{

    @Transform(value => Number(value.value))
    @IsInt()
    assetId: number;
}

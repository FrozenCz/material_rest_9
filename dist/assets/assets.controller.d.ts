import { CreateAssetsDto } from './dto/create-assets.dto';
import { User } from '../users/models/user.entity';
import { Assets } from './models/assets.entity';
import { UpdateAssetsInformationDto } from './dto/update-assets-information.dto';
import { ChangeUserBulkDto } from './dto/change-user-bulk.dto';
import { ChangeAssetInformationBulkDto } from './dto/change-asset-information-bulk.dto';
import { RemoveAssetsDto } from './dto/remove-assets.dto';
import { CreateAssetNoteDto } from './dto/create-asset-note.dto';
import { AssetsModelDto } from './dto/out/assetModel.dto';
import { Api } from '../api';
export declare class AssetsController {
    private api;
    constructor(api: Api);
    createAssets(createAssetsDto: CreateAssetsDto, user: User): Promise<any>;
    addNote(assetId: number, createAssetNoteDto: CreateAssetNoteDto, user: User): Promise<any>;
    changeUser(userId: number, assetId: number, user: User): Promise<Assets>;
    updateInformation(updateAssetsDto: UpdateAssetsInformationDto, assetId: number, user: User): Promise<Assets>;
    getAssetsList(): Promise<AssetsModelDto[]>;
    changeUserBulk(changeUserBulkDto: ChangeUserBulkDto[], user: User): Promise<Assets[]>;
    changeAssetInformationBulk(changeAssetInformationBulkDto: ChangeAssetInformationBulkDto[], user: User): Promise<Assets[]>;
    removeAssets(removeAssetsDto: RemoveAssetsDto, user: User): Promise<any>;
}

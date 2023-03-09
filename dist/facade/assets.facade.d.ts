import { AssetsService } from '../assets/assets.service';
import { CreateAssetsDto } from '../assets/dto/create-assets.dto';
import { User } from '../users/models/user.entity';
import { UpdateAssetsInformationDto } from '../assets/dto/update-assets-information.dto';
import { AssetsModelDto } from '../assets/dto/out/assetModel.dto';
import { ChangeUserBulkDto } from '../assets/dto/change-user-bulk.dto';
import { ChangeAssetInformationBulkDto } from '../assets/dto/change-asset-information-bulk.dto';
import { RemoveAssetsDto } from '../assets/dto/remove-assets.dto';
import { WsGateway } from '../websocket/ws.gateway';
import { AssetTransferQuery, TransferActionParams } from "../assets/models/asset.model";
import { LocationsService } from "../locations/locations.service";
export declare class AssetsFacade {
    private assetsService;
    private ws;
    private locationService;
    constructor(assetsService: AssetsService, ws: WsGateway, locationService: LocationsService);
    createAssets(createAssetsDto: CreateAssetsDto, user: User): Promise<void>;
    addNote(param: {
        note: string;
        assetId: number;
    }, user: User): Promise<import("../assets/models/assetNote.entity").AssetNote>;
    changeUser(assetId: number, userId: number, user: User): Promise<import("../assets/models/assets.entity").Assets>;
    changeAssetInformation(updateAssetsDto: UpdateAssetsInformationDto, assetId: number, user: User): Promise<import("../assets/models/assets.entity").Assets>;
    getAssetList(): Promise<AssetsModelDto[]>;
    changeUserBulk(changeUserBulkDto: ChangeUserBulkDto[], user: User): Promise<import("../assets/models/assets.entity").Assets[]>;
    changeAssetInformationBulk(changeAssetInformationBulkDto: ChangeAssetInformationBulkDto[], user: User): Promise<import("../assets/models/assets.entity").Assets[]>;
    removeAssets(removeAssetsDto: RemoveAssetsDto, user: User): Promise<void>;
    getAssetAttachment(attachmentId: string): Promise<import("../assets/models/assets-attachment.entity").AssetAttachmentsEntity>;
    getAssetDetail(assetId: number): Promise<AssetsModelDto>;
    getAssetTransferList(assetTransferQuery: AssetTransferQuery): Promise<import("../assets/models/asset-transfers.entity").AssetTransfersEntity[]>;
    getAssetTransferDetail(uuid: string): Promise<import("../assets/models/asset-transfers.entity").AssetTransfersEntity>;
    transferAction(param: TransferActionParams): Promise<import("../assets/models/asset-transfers.entity").AssetTransfersEntity>;
    getBarcodes(): Promise<import("../assets/models/assets.entity").Assets[]>;
}

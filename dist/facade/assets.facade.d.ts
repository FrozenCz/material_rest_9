import { AssetsService } from '../assets/assets.service';
import { CreateAssetsDto } from '../assets/dto/create-assets.dto';
import { User } from '../users/models/user.entity';
import { UpdateAssetsInformationDto } from '../assets/dto/update-assets-information.dto';
import { AssetsModelDto } from '../assets/dto/out/assetModel.dto';
import { ChangeUserBulkDto } from '../assets/dto/change-user-bulk.dto';
import { ChangeAssetInformationBulkDto } from '../assets/dto/change-asset-information-bulk.dto';
import { RemoveAssetsDto } from '../assets/dto/remove-assets.dto';
import { WsGateway } from '../websocket/ws.gateway';
import { AssetTransferQuery, TransferActionParams } from '../assets/models/asset.model';
import { LocationsService } from '../locations/locations.service';
import { StockTakingService } from '../assets/stock-taking.service';
import { UsersService } from '../users/users.service';
import { StockTakingEntity } from '../assets/models/stock-taking.entity';
import { Assets } from '../assets/models/assets.entity';
import { AssetChangeDTO } from '../assets/dto/barcodes.dto';
import { Location } from '../locations/models/location.entity';
import { PatchStockTakingDTO } from '../assets/dto/stock-taking.dto';
export declare class AssetsFacade {
    private usersService;
    private stockTakingService;
    private assetsService;
    private ws;
    private locationService;
    constructor(usersService: UsersService, stockTakingService: StockTakingService, assetsService: AssetsService, ws: WsGateway, locationService: LocationsService);
    createAssets(createAssetsDto: CreateAssetsDto, user: User): Promise<void>;
    addNote(param: {
        note: string;
        assetId: number;
    }, user: User): Promise<import("../assets/models/assetNote.entity").AssetNote>;
    changeUser(assetId: number, userId: number, user: User): Promise<Assets>;
    changeAssetInformation(updateAssetsDto: UpdateAssetsInformationDto, assetId: number, user: User): Promise<Assets>;
    getAssetList(): Promise<AssetsModelDto[]>;
    changeUserBulk(changeUserBulkDto: ChangeUserBulkDto[], user: User): Promise<Assets[]>;
    changeAssetInformationBulk(changeAssetInformationBulkDto: ChangeAssetInformationBulkDto[], user: User): Promise<Assets[]>;
    removeAssets(removeAssetsDto: RemoveAssetsDto, user: User): Promise<void>;
    getAssetAttachment(attachmentId: string): Promise<import("../assets/models/assets-attachment.entity").AssetAttachmentsEntity>;
    getAssetDetail(assetId: number): Promise<AssetsModelDto>;
    getAssetTransferList(assetTransferQuery: AssetTransferQuery): Promise<import("../assets/models/asset-transfers.entity").AssetTransfersEntity[]>;
    getAssetTransferDetail(uuid: string): Promise<import("../assets/models/asset-transfers.entity").AssetTransfersEntity>;
    transferAction(param: TransferActionParams): Promise<import("../assets/models/asset-transfers.entity").AssetTransfersEntity>;
    getBarcodes(): Promise<Assets[]>;
    getStockTakings(): Promise<StockTakingEntity[]>;
    createStockTaking(param: {
        name: string;
        solverId: number;
        user: User;
    }): Promise<StockTakingEntity>;
    private getUsersIds;
    private getAssetsByUsersIds;
    getStockTakingInProgress(user: User): Promise<{
        items: {
            id: number;
            assetName: string;
            serialNumber: string;
            location: Location;
            uuid: string;
            asset: Promise<Assets>;
            assetId: number;
            stockTaking: Promise<StockTakingEntity>;
            stockTakingUuid: string;
            foundInLocation: Promise<Location>;
            foundInLocationUuid: string;
            foundAt: Date;
            note: string;
        }[];
        uuid: string;
        name: string;
        solver: Promise<User>;
        solverId: number;
        author: Promise<User>;
        authorId: number;
        createdAt: Date;
        closedAt: Date;
    }[]>;
    private getStockTakingsByUser;
    private getItems;
    saveChangesBarcodes(param: {
        assets: AssetChangeDTO[];
    }): Promise<void>;
    patchStockTakingInProgress(param: {
        stockTakings: PatchStockTakingDTO[];
        user: User;
    }): Promise<StockTakingEntity[]>;
    private getUnclosedStockTakingsForSolver;
    private getUuids;
    private getStockTakingItemMapByStockTakingUuid;
    private updateStockTakingItems;
    closeStockTaking(param: {
        uuid: string;
        user: User;
    }): Promise<StockTakingEntity>;
}

import { UsersFacade } from 'src/facade/users.facade';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/models/user.entity';
import { GetUsersFilterDto } from 'src/users/dto/get-users-filter.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UpdateUsersDto } from 'src/users/dto/update-users.dto';
import { SetUserRightsDto } from 'src/users/dto/set-user-rights.dto';
import { Rights } from 'src/users/models/rights.entity';
import { CreateRightsDto } from 'src/users/dto/create-rights.dto';
import { AuthCredentialsDto } from './auth/dto/auth-credentials.dto';
import { AuthService } from './auth/auth.service';
import { AssetsFacade } from './facade/assets.facade';
import { CreateAssetsDto } from './assets/dto/create-assets.dto';
import { UpdateAssetsInformationDto } from './assets/dto/update-assets-information.dto';
import { ChangeUserBulkDto } from './assets/dto/change-user-bulk.dto';
import { ChangeAssetInformationBulkDto } from './assets/dto/change-asset-information-bulk.dto';
import { RemoveAssetsDto } from './assets/dto/remove-assets.dto';
import { Location } from './locations/models/location.entity';
import { LocationFacade } from './facade/location.facade';
import { CreateLocationDto, SaveNfcDTO, UpdateLocation } from './locations/dto/create-location.dto';
import { UserOutDto } from './users/dto/out/User.out.dto';
import { AddImageToAssetDto } from './assets/dto/add-image-to-asset.dto';
import { Assets } from './assets/models/assets.entity';
import { AssetAttachmentsEntity } from './assets/models/assets-attachment.entity';
import { AssetTransferQuery, RequestForAssetTransfer, TransferActionParams } from "./assets/models/asset.model";
export declare class Api {
    private authService;
    private usersFacade;
    private assetsFacade;
    private locationFacade;
    constructor(authService: AuthService, usersFacade: UsersFacade, assetsFacade: AssetsFacade, locationFacade: LocationFacade);
    createUser(createUserDto: CreateUserDto, user: User): Promise<User>;
    getUsers(getUsersFilterDto: GetUsersFilterDto, user?: User): Promise<UserOutDto[]>;
    getReachableUsers(user: User): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    updateUser(id: number, updateUserDto: UpdateUserDto, user: User): Promise<User>;
    updateUsersUnits(updateUsersDto: UpdateUsersDto, user: User): Promise<User>[] | any;
    deleteUser(id: number, user: User): Promise<void>;
    setUsersRights(userId: number, setUserRightsDto: SetUserRightsDto, user: User): Promise<Rights[]>;
    getRights(): Promise<Rights[]>;
    createRights(createRightsDto: CreateRightsDto): Promise<Rights>;
    singIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    createAssets(createAssetsDto: CreateAssetsDto, user: User): Promise<void>;
    addNote(param: {
        note: string;
        assetId: number;
    }, user: User): Promise<import("./assets/models/assetNote.entity").AssetNote>;
    changeUser(assetId: number, userId: number, user: User): Promise<Assets>;
    changeAssetInformation(updateAssetsDto: UpdateAssetsInformationDto, assetId: number, user: User): Promise<Assets>;
    getAssetsList(): Promise<import("./assets/dto/out/assetModel.dto").AssetsModelDto[]>;
    changeUserBulk(changeUserBulkDto: ChangeUserBulkDto[], user: User): Promise<Assets[]>;
    changeAssetInformationBulk(changeAssetInformationBulkDto: ChangeAssetInformationBulkDto[], user: User): Promise<Assets[]>;
    removeAssets(removeAssetsDto: RemoveAssetsDto, user: User): Promise<void>;
    getLocations(): Promise<Location[]>;
    createLocation(createLocationDto: CreateLocationDto, user: User): Promise<Location>;
    deleteLocation(id: string): Promise<void>;
    updateLocation(updateLocation: UpdateLocation, user: User): Promise<Location>;
    saveNfcId(locationUuid: string, saveNfcId: SaveNfcDTO): Promise<Location>;
    addImageToAsset(addImageToAssetDto: AddImageToAssetDto, assetId: number): Promise<void>;
    getAssetAttachment(attachmentId: string): Promise<AssetAttachmentsEntity>;
    getAssetDetail(assetId: number): Promise<import("./assets/dto/out/assetModel.dto").AssetsModelDto>;
    getCaretakers(): Promise<import("./users/dto/out/User.out.dto").Caretaker[]>;
    createRequestForAssetTransfer(requestForAssetTransfer: RequestForAssetTransfer): Promise<import("./assets/models/asset-transfers.entity").AssetTransfersEntity>;
    assetTransferList(assetTransferQuery: AssetTransferQuery): Promise<import("./assets/models/asset-transfers.entity").AssetTransfersEntity[]>;
    getAssetTransferDetail(uuid: string): Promise<import("./assets/models/asset-transfers.entity").AssetTransfersEntity>;
    transferAction(param: TransferActionParams): Promise<import("./assets/models/asset-transfers.entity").AssetTransfersEntity>;
    getBarcodes(): Promise<Assets[]>;
    getStockTaking(): Promise<import("./assets/models/stock-taking.entity").StockTakingEntity[]>;
    createStockTaking(param: {
        name: string;
        solverId: number;
        user: User;
    }): Promise<import("./assets/models/stock-taking.entity").StockTakingEntity>;
    getStockTakingInProgress(user: User): Promise<{
        items: {
            id: number;
            name: string;
            serialNumber: string;
            location: Location;
            uuid: string;
            asset: Promise<Assets>;
            assetId: number;
            stockTaking: Promise<import("./assets/models/stock-taking.entity").StockTakingEntity>;
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
        createAt: Date;
        closedAt: Date;
    }[]>;
}
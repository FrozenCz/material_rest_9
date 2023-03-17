import { CreateAssetsDto } from './dto/create-assets.dto';
import { Assets } from './models/assets.entity';
import { User } from '../users/models/user.entity';
import { CategoriesService } from '../categories/categories.service';
import { UsersService } from '../users/users.service';
import { UnitsService } from '../units/units.service';
import { UpdateAssetsInformationDto } from './dto/update-assets-information.dto';
import { ChangeUserBulkDto } from './dto/change-user-bulk.dto';
import { Connection, DataSource, EntityManager, Repository } from 'typeorm';
import { ChangeAssetInformationBulkDto } from './dto/change-asset-information-bulk.dto';
import { RemoveAssetsDto } from './dto/remove-assets.dto';
import { ProtocolsService } from '../protocols/protocols.service';
import { RemovingProtocol } from '../protocols/models/protocols.entity';
import { HistoryService } from '../history/history.service';
import { AssetNote } from './models/assetNote.entity';
import { CreateAssetNote } from './models/assetNote.model';
import { AssetAttachmentsEntity } from './models/assets-attachment.entity';
import { AssetTransferQuery, ReqAssetTransferWithCaretakers, TransferActionParams } from './models/asset.model';
import { AssetTransfersEntity } from './models/asset-transfers.entity';
export declare class AssetsService {
    private assetsRepository;
    private assetsAttachmentRepository;
    private assetTransfersRepository;
    private categoriesService;
    private usersService;
    private unitsService;
    private connection;
    private protocolService;
    private historyService;
    private dataSource;
    constructor(assetsRepository: Repository<Assets>, assetsAttachmentRepository: Repository<AssetAttachmentsEntity>, assetTransfersRepository: Repository<AssetTransfersEntity>, categoriesService: CategoriesService, usersService: UsersService, unitsService: UnitsService, connection: Connection, protocolService: ProtocolsService, historyService: HistoryService, dataSource: DataSource);
    createAssets(newAsset: CreateAssetsDto, creator: User): Promise<any>;
    getAssetsList(): Promise<Assets[]>;
    getAsset(id: number): Promise<Assets>;
    changeAssetInformation(updateAssetsDto: UpdateAssetsInformationDto, assetId: number, user: User, managerForTransaction?: EntityManager): Promise<Assets>;
    getAssets(assetsIds: number[]): Promise<Assets[]>;
    changeUser(assetId: number, userId: number, user: User, managerForTransaction?: EntityManager): Promise<Assets>;
    changeUserBulk(changeUserBulkDto: ChangeUserBulkDto[], user: User): Promise<Assets[]>;
    changeAssetInformationBulk(changeAssetInformationBulkDto: ChangeAssetInformationBulkDto[], user: User): Promise<Assets[]>;
    removeAssets(removeAssetsDto: RemoveAssetsDto, user: User): Promise<RemovingProtocol>;
    haveSomeAssets(user: User): Promise<boolean>;
    addNote(createAssetNote: CreateAssetNote, user: any): Promise<AssetNote>;
    getAssetAttachment(attachmentId: string): Promise<AssetAttachmentsEntity>;
    private findAssetAttachmentWithBinaryById;
    createRequestForAssetTransfer(requestForAssetTransfer: ReqAssetTransferWithCaretakers): Promise<AssetTransfersEntity>;
    private checkIfAnyAssetIsNotInActiveTransfer;
    getAssetTransferList(assetTransferQuery: AssetTransferQuery): Promise<AssetTransfersEntity[]>;
    getAssetTransferDetail(uuid: string): Promise<AssetTransfersEntity>;
    transferAction(param: TransferActionParams): Promise<AssetTransfersEntity>;
    private isInActiveTransfer;
    private isUserCaretakerFrom;
    private isUnitMatch;
    private isUserCaretakerTo;
    private handleRevertAction;
    private handleRejectAction;
    getAssetsMap$(): Promise<Map<number, Assets>>;
}

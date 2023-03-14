import { Caretaker } from '../../users/dto/out/User.out.dto';
import { Assets } from './assets.entity';
import { User } from '../../users/models/user.entity';
export interface RequestForAssetTransfer {
    fromUser: number;
    toUser: number;
    assetIds: number[];
    message: string | null;
}
export interface ReqAssetTransferWithCaretakers {
    assets: Assets[];
    caretakerFrom: Caretaker;
    caretakerTo: Caretaker;
    message: string | null;
}
export declare class AssetTransferQuery {
    caretakerFrom?: number;
    assetId?: number;
    rejected?: boolean;
    accepted?: boolean;
    reverted?: boolean;
}
export type TransferAction = 'accept' | 'reject' | 'revert';
export interface TransferActionParams {
    uuid: string;
    user: User;
    action: TransferAction;
}

import { BaseEntity } from 'typeorm';
import { User } from '../../users/models/user.entity';
import { Category } from '../../categories/models/category.entity';
import { RemovingProtocol } from '../../protocols/models/protocols.entity';
import { AssetNote } from './assetNote.entity';
import { Location } from '../../locations/models/location.entity';
import { AssetAttachmentsEntity } from './assets-attachment.entity';
export declare enum AssetState {
    actual = 0,
    removed = 1
}
export declare class Assets extends BaseEntity {
    id: number;
    name: string;
    quantity: number;
    serialNumber: string;
    inventoryNumber: string;
    evidenceNumber: string;
    identificationNumber: string;
    inquiryDate: Date;
    document: string;
    location: Promise<Location>;
    location_uuid: string;
    locationEtc: string;
    note: string;
    inquiryPrice: number;
    user: Promise<User>;
    user_id: number;
    category: Promise<Category>;
    category_id: number;
    state: AssetState;
    removingProtocol: RemovingProtocol;
    version: number;
    assetNotes: AssetNote[];
    attachments: AssetAttachmentsEntity[];
}

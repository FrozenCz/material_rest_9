import { BaseEntity } from 'typeorm';
import { User } from '../../users/models/user.entity';
import { Assets } from './assets.entity';
export declare class AssetNote extends BaseEntity {
    id: number;
    created: Date;
    updated: Date;
    text: string;
    user: User;
    deleted: boolean;
    deletedByUser: User;
    asset: Assets;
}

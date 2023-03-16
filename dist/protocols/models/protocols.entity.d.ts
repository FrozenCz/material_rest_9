import { BaseEntity } from 'typeorm';
import { User } from '../../users/models/user.entity';
import { Assets } from '../../assets/models/assets.entity';
export declare class RemovingProtocol extends BaseEntity {
    id: number;
    document: string;
    documentDate: Date;
    possibleRemovingDate: Date;
    created: Date;
    user: User;
    assets: Assets[];
}

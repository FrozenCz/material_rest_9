import { BaseEntity } from 'typeorm';
import { Assets } from '../../assets/models/assets.entity';
import { User } from '../../users/models/user.entity';
export declare class ListEntity extends BaseEntity {
    id: number;
    name: string;
    category: string;
    connected: boolean;
    archived: boolean;
    description: string;
    created: Date;
    updated: Date;
    assets: Assets[];
    user: User;
}

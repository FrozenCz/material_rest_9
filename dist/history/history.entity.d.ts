import { BaseEntity } from 'typeorm';
import { User } from '../users/models/user.entity';
import { HistoryRelatedTo } from './models/history.model';
import { Assets } from '../assets/models/assets.entity';
export declare class History extends BaseEntity {
    id: number;
    changedBy: User;
    relatedTo: HistoryRelatedTo;
    changedFrom: string;
    changedTo: string;
    created: Date;
    user: User;
    asset: Assets;
}

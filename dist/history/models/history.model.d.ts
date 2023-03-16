import { User } from '../../users/models/user.entity';
import { Assets } from '../../assets/models/assets.entity';
export interface CreateHistory {
    changedFrom: string;
    changedTo: string;
    relatedTo: HistoryRelatedTo;
    user?: User;
    asset?: Assets;
}
interface SimpleUser {
    id: number;
    name: string;
    surname: string;
    unit: {
        id: number;
        name: string;
    };
}
export interface HistoryDto {
    id: number;
    changedBy: SimpleUser;
    changedFrom: Partial<Assets>;
    changedTo: Partial<Assets>;
    relatedTo: HistoryRelatedTo;
    created: Date;
    asset?: Assets;
    user?: SimpleUser;
}
export declare enum HistoryRelatedTo {
    assetsCreate = "assetsCreate",
    assetsChangeInformation = "assetsChangeInformation",
    assetsUserChange = "assetsUserChange",
    assetsRemoved = "assetsRemoved"
}
export {};

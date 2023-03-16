import { BaseEntity } from "typeorm";
import { User } from "../../users/models/user.entity";
import { StockTakingItemEntity } from "./stock-taking-item.entity";
export declare class StockTakingEntity extends BaseEntity {
    uuid: string;
    name: string;
    solver: Promise<User>;
    solverId: number;
    author: Promise<User>;
    authorId: number;
    items: StockTakingItemEntity[];
    createAt: Date;
    closedAt: Date | null;
}

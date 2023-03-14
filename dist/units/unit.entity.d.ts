import { BaseEntity } from 'typeorm';
import { User } from '../users/models/user.entity';
export declare class Unit extends BaseEntity {
    id: number;
    name: string;
    children: Unit[];
    parent: Unit;
    users: User[];
    version: number;
}

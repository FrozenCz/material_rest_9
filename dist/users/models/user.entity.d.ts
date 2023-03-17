import { BaseEntity } from 'typeorm';
import { Rights } from './rights.entity';
import { Unit } from '../../units/unit.entity';
export declare class User extends BaseEntity {
    id: number;
    username: string;
    name: string;
    surname: string;
    password: string;
    salt: string;
    rights: Rights[];
    unit: Unit;
    active: boolean;
    version: number;
    validatePassword(password: string): Promise<boolean>;
}

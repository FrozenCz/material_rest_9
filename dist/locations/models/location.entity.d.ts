import { BaseEntity } from "typeorm";
import { Unit } from '../../units/unit.entity';
export declare class Location extends BaseEntity {
    uuid: string;
    ord: number;
    nfcId: string;
    name: string;
    children: Location[];
    parent: Location;
    parent_uuid: string;
    masterUnit: Unit;
    version: number;
}

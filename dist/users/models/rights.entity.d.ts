import { BaseEntity } from 'typeorm';
import { RightsCategoryEnum, RightsTag } from "../config/rights.list";
export declare class Rights extends BaseEntity {
    id: number;
    tag: RightsTag;
    name: string;
    description: string;
    relatedTo: RightsCategoryEnum;
}

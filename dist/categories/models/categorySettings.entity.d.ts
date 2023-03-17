import { BaseEntity } from 'typeorm';
export declare class CategorySettings extends BaseEntity {
    id: number;
    name: string;
    config: string;
    version: number;
}

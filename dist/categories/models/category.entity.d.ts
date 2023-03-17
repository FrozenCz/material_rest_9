import { BaseEntity } from 'typeorm';
export declare class Category extends BaseEntity {
    id: number;
    name: string;
    code: string;
    children: Category[];
    parent: Category;
    version: number;
}

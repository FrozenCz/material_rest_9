import { BaseEntity } from "typeorm";
export declare class LoggingEntity extends BaseEntity {
    uuid: string;
    method: string;
    url: string;
    type: 'log' | 'error';
    body: JSON;
    result: JSON;
    time_ms: number;
    username: string | null;
    createdAt: Date;
}

/// <reference types="node" />
import { BaseEntity } from 'typeorm';
import { User } from '../users/models/user.entity';
export declare abstract class Attachment extends BaseEntity {
    attachment_id: string;
    filename: string;
    binaryData: Buffer;
    uploadedBy: Promise<User>;
    createdAt: Date;
    deletedAt: Date;
}

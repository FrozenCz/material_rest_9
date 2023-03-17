import { DataSource, EntitySubscriberInterface, InsertEvent, RemoveEvent, UpdateEvent } from 'typeorm';
import { WsGateway } from '../ws.gateway';
import { Logger } from '@nestjs/common';
import { Assets } from '../../assets/models/assets.entity';
import { AssetAttachmentsEntity } from '../../assets/models/assets-attachment.entity';
export declare class AssetSubscriber implements EntitySubscriberInterface<Assets> {
    private readonly wsGateway;
    private dataSource;
    logger: Logger;
    constructor(wsGateway: WsGateway, dataSource: DataSource);
    listenTo(): typeof Assets;
    afterInsert(event: InsertEvent<Assets>): Promise<void>;
    afterUpdate(event: UpdateEvent<Assets>): Promise<void>;
    afterRemove(event: RemoveEvent<Assets>): Promise<void>;
    private handleUpdate;
}
export declare class AssetAttachmentSubscriber implements EntitySubscriberInterface<AssetAttachmentsEntity> {
    private readonly wsGateway;
    private dataSource;
    logger: Logger;
    constructor(wsGateway: WsGateway, dataSource: DataSource);
    listenTo(): typeof AssetAttachmentsEntity;
    afterInsert(event: InsertEvent<AssetAttachmentsEntity>): Promise<void>;
    afterUpdate(event: UpdateEvent<AssetAttachmentsEntity>): Promise<void>;
    afterRemove(event: RemoveEvent<AssetAttachmentsEntity>): Promise<void>;
    private handleUpdate;
}

import { DataSource, EntitySubscriberInterface, InsertEvent, RemoveEvent, UpdateEvent } from 'typeorm';
import { Location } from '../../locations/models/location.entity';
import { WsGateway } from '../ws.gateway';
import { Logger } from '@nestjs/common';
export declare class LocationSubscriber implements EntitySubscriberInterface<Location> {
    private readonly wsGateway;
    private dataSource;
    logger: Logger;
    constructor(wsGateway: WsGateway, dataSource: DataSource);
    listenTo(): typeof Location;
    afterInsert(event: InsertEvent<Location>): Promise<void>;
    afterUpdate(event: UpdateEvent<Location>): Promise<void>;
    afterRemove(event: RemoveEvent<Location>): Promise<void>;
    private handleUpdate;
}

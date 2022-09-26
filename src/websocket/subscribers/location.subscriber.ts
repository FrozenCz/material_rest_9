import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { Location } from '../../locations/models/location.entity';
import { SubscribeMessageEnum, WsGateway } from '../ws.gateway';
import { noop } from 'rxjs';
import { Logger } from '@nestjs/common';

@EventSubscriber()
export class LocationSubscriber implements EntitySubscriberInterface<Location> {
  logger: Logger = new Logger('LocationSubscriber');

  constructor(
    private readonly wsGateway: WsGateway,
    private dataSource: DataSource,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Location;
  }

  async afterInsert(event: InsertEvent<Location>) {
    this.handleUpdate(event.entity)
      .then(noop)
      .catch((err) => this.logger.warn(err));
  }

  async afterUpdate(event: UpdateEvent<Location>) {
    this.handleUpdate(event.entity as Location)
      .then(noop)
      .catch((err) => this.logger.warn(err));
  }

  async afterRemove(event: RemoveEvent<Location>) {
    this.wsGateway.wsChanges$.next({
      type: SubscribeMessageEnum.locationDelete,
      changes: null,
    });
  }

  private async handleUpdate(entity: Location) {
    this.wsGateway.wsChanges$.next({
      type: SubscribeMessageEnum.locationUpdate,
      changes: entity,
    });
  }
}

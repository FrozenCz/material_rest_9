import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { SubscribeMessageEnum, WsGateway } from '../ws.gateway';
import { noop } from 'rxjs';
import { Logger } from '@nestjs/common';
import { Assets } from '../../assets/models/assets.entity';
import { Transforms } from '../../utils/transforms';
import { AssetAttachmentsEntity } from '../../assets/models/assets-attachment.entity';

@EventSubscriber()
export class AssetSubscriber implements EntitySubscriberInterface<Assets> {
  logger: Logger = new Logger('AssetSubscriber');

  constructor(
    private readonly wsGateway: WsGateway,
    private dataSource: DataSource,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Assets;
  }

  async afterInsert(event: InsertEvent<Assets>) {
    this.handleUpdate(event.entity)
      .then(noop)
      .catch((err) => this.logger.warn(err));
  }

  async afterUpdate(event: UpdateEvent<Assets>) {
    this.handleUpdate(event.entity as Assets)
      .then(noop)
      .catch((err) => this.logger.warn(err));
  }

  async afterRemove(event: RemoveEvent<Assets>) {
    this.wsGateway.wsChanges$.next({
      type: SubscribeMessageEnum.assetsUpdate,
      changes: null,
    });
  }

  private async handleUpdate(entity: Assets) {
    this.wsGateway.wsChanges$.next({
      type: SubscribeMessageEnum.assetsUpdate,
      changes: [Transforms.assetToAssetDto(entity)],
    });
  }
}

@EventSubscriber()
export class AssetAttachmentSubscriber
  implements EntitySubscriberInterface<AssetAttachmentsEntity>
{
  logger: Logger = new Logger('AssetAttachmentSubscriber');

  constructor(
    private readonly wsGateway: WsGateway,
    private dataSource: DataSource,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return AssetAttachmentsEntity;
  }

  async afterInsert(event: InsertEvent<AssetAttachmentsEntity>) {
    this.handleUpdate(event.entity)
      .then(noop)
      .catch((err) => this.logger.warn(err));
  }

  async afterUpdate(event: UpdateEvent<AssetAttachmentsEntity>) {
    this.handleUpdate(event.entity as AssetAttachmentsEntity)
      .then(noop)
      .catch((err) => this.logger.warn(err));
  }

  async afterRemove(event: RemoveEvent<AssetAttachmentsEntity>) {
    this.wsGateway.wsChanges$.next({
      type: SubscribeMessageEnum.assetsUpdate,
      changes: null,
    });
  }

  private async handleUpdate(entity: AssetAttachmentsEntity) {
    setTimeout(async () => {
      const assetWithAttachments = await Assets.findOne({where: {id: entity.asset.id}});
      this.wsGateway.wsChanges$.next({
        type: SubscribeMessageEnum.assetsUpdate,
        changes: [Transforms.assetToAssetDto(assetWithAttachments)],
      });
    })
  }
}

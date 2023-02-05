import { Attachment } from '../../abstract/attachment';
import { Assets } from './assets.entity';
import { Column, Entity, Index, ManyToOne, RelationId } from 'typeorm';

@Entity('assets_attachments')
export class AssetAttachmentsEntity extends Attachment {
  @ManyToOne(() => Assets, (asset) => asset.id, { orphanedRowAction: 'delete' })
  asset: Assets;

  @Column()
  type: AssetAttachmentType;
}

export enum AssetAttachmentType {
  file,
  image,
}

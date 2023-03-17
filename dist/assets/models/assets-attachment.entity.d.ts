import { Attachment } from '../../abstract/attachment';
import { Assets } from './assets.entity';
export declare class AssetAttachmentsEntity extends Attachment {
    asset: Assets;
    type: AssetAttachmentType;
}
export declare enum AssetAttachmentType {
    file = 0,
    image = 1
}

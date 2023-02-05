import { Assets } from '../assets/models/assets.entity';
import {
  AssetsAttachmentsDto,
  AssetsModelDto,
} from '../assets/dto/out/assetModel.dto';
import { User } from '../users/models/user.entity';
import { UserOutDto } from '../users/dto/out/User.out.dto';
import { AssetAttachmentsEntity } from '../assets/models/assets-attachment.entity';

export abstract class Transforms {
  public static assetToAssetDto(asset: Assets): AssetsModelDto {
    if (asset.attachments?.length > 0) {
      console.log(asset.attachments.length);
    }
    return {
      ...asset,
      removingProtocol_id: null,
      attachments:
        asset.attachments?.map((a) =>
          Transforms.assetAttachmentToDto(a, asset.id),
        ) ?? [],
    };
  }

  public static assetAttachmentToDto(
    assetAttachment: AssetAttachmentsEntity,
    assetId: number,
  ): AssetsAttachmentsDto {
    return {
      type: assetAttachment.type,
      url:
        '/assets/' +
        assetId +
        '/attachments/' +
        assetAttachment.attachment_id +
        '/' +
        assetAttachment.filename,
      filename: assetAttachment.filename,
      uuid: assetAttachment.attachment_id,
    };
  }

  public static userToUserDto(
    u: User,
    reachableUsers: Map<number, User>,
  ): UserOutDto {
    return {
      id: u.id,
      username: u.username,
      name: u.name,
      surname: u.surname,
      reachable: !!reachableUsers.get(u.id),
      unit_id: u.unit.id,
    };
  }
}

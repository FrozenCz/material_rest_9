import { Assets } from '../assets/models/assets.entity';
import { AssetsAttachmentsDto, AssetsModelDto } from '../assets/dto/out/assetModel.dto';
import { User } from '../users/models/user.entity';
import { UserOutDto } from '../users/dto/out/User.out.dto';
import { AssetAttachmentsEntity } from '../assets/models/assets-attachment.entity';
export declare abstract class Transforms {
    static assetToAssetDto(asset: Assets): AssetsModelDto;
    static assetAttachmentToDto(assetAttachment: AssetAttachmentsEntity, assetId: number): AssetsAttachmentsDto;
    static userToUserDto(u: User, reachableUsers: Map<number, User>): UserOutDto;
}

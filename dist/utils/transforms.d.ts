import { Assets } from '../assets/models/assets.entity';
import { AssetsModelDto } from '../assets/dto/out/assetModel.dto';
import { User } from '../users/models/user.entity';
import { UserOutDto } from '../users/dto/out/User.out.dto';
export declare abstract class Transforms {
    static assetToAssetDto(asset: Assets): AssetsModelDto;
    static userToUserDto(u: User, reachableUsers: Map<number, User>): UserOutDto;
}

import { Assets } from '../assets/models/assets.entity';
import { AssetsModelDto } from '../assets/dto/out/assetModel.dto';
import { User } from '../users/models/user.entity';
import { UserOutDto } from '../users/dto/out/User.out.dto';

export abstract class Transforms {
  public static assetToAssetDto(asset: Assets): AssetsModelDto {
    return {
      ...asset,
      removingProtocol_id: null,
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

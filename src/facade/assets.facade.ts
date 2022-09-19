import { Injectable } from '@nestjs/common';
import { AssetsService } from '../assets/assets.service';
import { CreateAssetsDto } from '../assets/dto/create-assets.dto';
import { User } from '../users/models/user.entity';
import { UpdateAssetsInformationDto } from '../assets/dto/update-assets-information.dto';
import { AssetsModelDto } from '../assets/dto/out/assetModel.dto';
import { ChangeUserBulkDto } from '../assets/dto/change-user-bulk.dto';
import { ChangeAssetInformationBulkDto } from '../assets/dto/change-asset-information-bulk.dto';
import { RemoveAssetsDto } from '../assets/dto/remove-assets.dto';

@Injectable()
export class AssetsFacade {
  constructor(private assetsService: AssetsService) {}

  createAssets(createAssetsDto: CreateAssetsDto, user: User): Promise<void> {
    return this.assetsService.createAssets(createAssetsDto, user);
  }

  addNote(param: { note: string; assetId: number }, user: User) {
    return this.assetsService.addNote(param, user);
  }

  changeUser(assetId: number, userId: number, user: User) {
    return this.assetsService.changeUser(assetId, userId, user);
  }

  changeAssetInformation(
    updateAssetsDto: UpdateAssetsInformationDto,
    assetId: number,
    user: User,
  ) {
    return this.assetsService.changeAssetInformation(
      updateAssetsDto,
      assetId,
      user,
    );
  }

  getAssetList(): Promise<AssetsModelDto[]> {
    return this.assetsService.getAssetsList().then((assetsList) => {
      return assetsList.map((a) => {
        return {
          ...a,
          removingProtocol_id: null,
        };
      });
    });
  }

  changeUserBulk(changeUserBulkDto: ChangeUserBulkDto[], user: User) {
    return this.assetsService.changeUserBulk(changeUserBulkDto, user);
  }

  changeAssetInformationBulk(
    changeAssetInformationBulkDto: ChangeAssetInformationBulkDto[],
    user: User,
  ) {
    return this.assetsService.changeAssetInformationBulk(
      changeAssetInformationBulkDto,
      user,
    );
  }

  removeAssets(removeAssetsDto: RemoveAssetsDto, user: User) {
    return this.assetsService.removeAssets(removeAssetsDto, user);
  }
}

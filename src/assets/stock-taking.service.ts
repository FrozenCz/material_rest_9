import { Injectable } from '@nestjs/common';
import { StockTakingEntity } from './models/stock-taking.entity';
import { User } from '../users/models/user.entity';
import { Assets } from './models/assets.entity';
import { StockTakingItemEntity } from './models/stock-taking-item.entity';
import { In } from "typeorm";

@Injectable()
export class StockTakingService {

  getStockTakings(): Promise<StockTakingEntity[]> {
    return StockTakingEntity.find();
  }

  getStockTakingsByUuids(uuids: string[]): Promise<StockTakingEntity[]> {
    return StockTakingEntity.find({where: {
      uuid: In(uuids)
      }})
  }

  createStockTaking(param: {
    name: string;
    solverId: number;
    user: User;
    assets: Assets[];
  }) {
    const { solverId, user, name, assets } = param;

    const newStockTaking = new StockTakingEntity();
    newStockTaking.authorId = user.id;
    newStockTaking.solverId = solverId;
    newStockTaking.name = name;
    newStockTaking.items = this.prepareItems(assets);

    return newStockTaking.save();
  }

  private prepareItems(assets: Assets[]) {
    return assets.map((asset) => {
      const newItem = new StockTakingItemEntity();
      newItem.assetId = asset.id;
      return newItem;
    });
  }
}

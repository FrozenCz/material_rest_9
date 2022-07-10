import { Injectable } from '@nestjs/common';
import {
  CreateHistory,
  HistoryDto,
  HistoryRelatedTo,
} from './models/history.model';
import { History } from './history.entity';
import { User } from '../users/models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
  ) {}

  private static compareValueDifferences(
    obj1,
    obj2,
  ): { changedFrom: any; changedTo: any } {
    const o1 = JSON.parse(obj1);
    const o2 = JSON.parse(obj2);
    const differencesOn = Object.keys(o1).filter(
      (o) => o1[o] !== o2[o] && typeof o1[o] !== 'object',
    );
    const changedFrom = {};
    const changedTo = {};

    differencesOn.forEach((key) => {
      changedFrom[key] = o1[key];
      changedTo[key] = o2[key];
    });
    return { changedFrom, changedTo };
  }

  async saveHistory(
    createHistory: CreateHistory,
    user: User,
  ): Promise<History> {
    const history = new History();

    switch (createHistory.relatedTo) {
      case HistoryRelatedTo.assetsCreate:
        history.asset = createHistory.asset;
        history.changedFrom = '';
        history.changedTo = createHistory.changedTo;
        break;
      case HistoryRelatedTo.assetsChangeInformation:
        history.asset = createHistory.asset;
        const compared = HistoryService.compareValueDifferences(
          createHistory.changedFrom,
          createHistory.changedTo,
        );
        history.changedFrom = JSON.stringify(compared.changedFrom);
        history.changedTo = JSON.stringify(compared.changedTo);
        break;
      case HistoryRelatedTo.assetsUserChange:
        history.asset = createHistory.asset;
        const userFrom: User = JSON.parse(createHistory.changedFrom).user;
        const userTo: User = JSON.parse(createHistory.changedTo).user;
        history.changedFrom = JSON.stringify({
          userId: userFrom.id,
          name: userFrom.name,
          surname: userFrom.surname,
        });
        history.changedTo = JSON.stringify({
          userId: userTo.id,
          name: userTo.name,
          surname: userTo.surname,
        });
        break;
      case HistoryRelatedTo.assetsRemoved:
        history.asset = createHistory.asset;
        history.changedFrom = createHistory.changedFrom;
        history.changedTo = '';
        break;
    }

    history.changedBy = user;
    history.relatedTo = createHistory.relatedTo;

    return await this.historyRepository.save(history);
  }

  async getHistory(): Promise<HistoryDto[]> {
    return (await this.historyRepository.find({ order: { id: 'DESC' } })).map(
      (history) => this.processHistory(history),
    );
  }

  async getHistoryForAsset(assetId: number): Promise<HistoryDto[]> {
    return (
      await this.historyRepository.find({
        where: { asset: { id: assetId } },
        order: { id: 'DESC' },
      })
    ).map((history) => this.processHistory(history));
  }

  private processHistory(history: History): HistoryDto {
    const historyDto: HistoryDto = {
      id: history.id,
      changedBy: {
        id: history.changedBy.id,
        name: history.changedBy.name,
        surname: history.changedBy.surname,
        unit: {
          id: history.changedBy.unit.id,
          name: history.changedBy.unit.name,
        },
      },
      changedFrom:
        history.changedFrom.length > 2 ? JSON.parse(history.changedFrom) : null,
      changedTo:
        history.changedTo.length > 2 ? JSON.parse(history.changedTo) : null,
      relatedTo: history.relatedTo,
      created: history.created,
    };
    if (history.asset) {
      historyDto.asset = history.asset;
    }

    if (history.user) {
      historyDto.user = {
        id: history.user.id,
        name: history.user.name,
        surname: history.user.surname,
        unit: {
          id: history.user.unit.id,
          name: history.user.unit.name,
        },
      };
    }
    return historyDto;
  }
}

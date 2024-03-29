import { Injectable } from '@nestjs/common';
import { User } from '../users/models/user.entity';
import { RemovingProtocol } from './models/protocols.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateRemovingProtocol } from './models/removing.protocols';

@Injectable()
export class ProtocolsService {
  constructor(
    @InjectRepository(RemovingProtocol)
    private removingProtocolsRepository: Repository<RemovingProtocol>,
  ) {}

  getRemovingProtocolsList(): Promise<RemovingProtocol[]> {
    return this.removingProtocolsRepository.find();
  }

  // createProtocol()

  async createRemovingProtocol(
    removeAssetsDto: ICreateRemovingProtocol,
    user: User,
    transactionManager?: EntityManager,
  ): Promise<RemovingProtocol> {
    const {
      assets,
      documentDate,
      possibleRemovingDate,
      removingDocumentIdentification,
    } = removeAssetsDto;
    const protocol = new RemovingProtocol();
    protocol.document = removingDocumentIdentification;
    protocol.documentDate = documentDate;
    protocol.possibleRemovingDate = possibleRemovingDate;
    protocol.assets = assets;
    if (transactionManager) {
      return await transactionManager.save(protocol);
    }
    return protocol.save();
  }
}

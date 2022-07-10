import {EntityRepository, Repository} from 'typeorm';
import {RemovingProtocol} from '../models/protocols.entity';

@EntityRepository(RemovingProtocol)
export class RemovingProtocolsRepository extends Repository<RemovingProtocol>{


}

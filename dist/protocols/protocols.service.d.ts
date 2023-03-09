import { User } from '../users/models/user.entity';
import { RemovingProtocol } from './models/protocols.entity';
import { EntityManager, Repository } from 'typeorm';
import { ICreateRemovingProtocol } from './models/removing.protocols';
export declare class ProtocolsService {
    private removingProtocolsRepository;
    constructor(removingProtocolsRepository: Repository<RemovingProtocol>);
    getRemovingProtocolsList(): Promise<RemovingProtocol[]>;
    createRemovingProtocol(removeAssetsDto: ICreateRemovingProtocol, user: User, transactionManager?: EntityManager): Promise<RemovingProtocol>;
}

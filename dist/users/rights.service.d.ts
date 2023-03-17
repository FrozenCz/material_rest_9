import { Rights } from './models/rights.entity';
import { CreateRightsDto } from './dto/create-rights.dto';
import { Repository } from 'typeorm';
export declare class RightsService {
    private rightsRepository;
    constructor(rightsRepository: Repository<Rights>);
    getRights(): Promise<Rights[]>;
    createRights(createRightsDto: CreateRightsDto): Promise<Rights>;
    countRights(): Promise<number>;
    fillRights(): Promise<void>;
    getRightsById(rightsToAdd: number): Promise<Rights>;
}

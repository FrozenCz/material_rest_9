import { CreateListDto } from './dto/create-list.dto';
import { User } from '../users/models/user.entity';
import { ListEntity } from './models/list.entity';
import { AssetsService } from '../assets/assets.service';
import { Repository } from 'typeorm';
export declare class ListsService {
    private listsRepositories;
    private assetsService;
    constructor(listsRepositories: Repository<ListEntity>, assetsService: AssetsService);
    getList(id: number): Promise<ListEntity>;
    createList(createListDto: CreateListDto, user: User): Promise<ListEntity>;
    getLists(user: User): Promise<ListEntity[]>;
    updateList(updatedListId: number, createListDto: CreateListDto, user: User): Promise<ListEntity>;
    deleteList(listId: number, user: User): Promise<void>;
}

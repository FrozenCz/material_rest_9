import { CreateListDto } from './dto/create-list.dto';
import { ListEntity } from './models/list.entity';
import { ListsService } from './lists.service';
import { User } from '../users/models/user.entity';
export declare class ListsController {
    private listsService;
    constructor(listsService: ListsService);
    getLists(user: User): Promise<ListEntity[]>;
    createList(createListDto: CreateListDto, user: User): Promise<ListEntity>;
    updateList(listId: number, createListDto: CreateListDto, user: User): Promise<ListEntity>;
    deleteList(listId: number, user: User): Promise<void>;
}

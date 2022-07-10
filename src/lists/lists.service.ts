import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {CreateListDto} from './dto/create-list.dto';
import {User} from '../users/models/user.entity';
import {ListEntity} from './models/list.entity';
import {AssetsService} from '../assets/assets.service';
import {InjectRepository} from '@nestjs/typeorm';
import {ListsRepositories} from './repositories/lists.repositories';
import {UtilFuncs} from '../utils/utilFuncs';

@Injectable()
export class ListsService {

    constructor(
        @InjectRepository(ListsRepositories)
        private listsRepositories: ListsRepositories,
        private assetsService: AssetsService
    ) {
    }

    async getList(id: number): Promise<ListEntity> {
        return await this.listsRepositories.findOne({where: {id}});
    }

    /**
     * list create method
     * @param createListDto list params
     * @param user who create list
     */
    async createList(createListDto: CreateListDto, user: User): Promise<ListEntity> {
        const {name, category, connected, archived, description, assetsIds} = createListDto;

        const assets = await this.assetsService.getAssets(assetsIds);
        if(assets?.length < 1) {
            throw new NotFoundException('No assets found');
        }


        const newList = new ListEntity();
        newList.name = name;
        newList.category = category;
        newList.connected = UtilFuncs.getBoolean(connected);
        newList.archived = UtilFuncs.getBoolean(archived);
        newList.description = description;
        newList.assets = assets;
        newList.user = user;

        const savedList = await newList.save();
        delete savedList.user.rights;

        return savedList;
    }

    getLists(user: User): Promise<ListEntity[]> {
        return this.listsRepositories.getUserLists(user);
    }

    /**
     * completely update list
     * @param updatedListId updated list identifier
     * @param createListDto updated
     * @param user user who wants to update list
     */
    async updateList(updatedListId: number, createListDto: CreateListDto, user: User): Promise<ListEntity> {
        const existingList = await this.getList(updatedListId);

        if (!existingList) {
            throw new NotFoundException('List not found!');
        }

        if (existingList.user.id !== user.id) {
            throw new UnauthorizedException("You haven't got permission to do that");
        }

        if (createListDto.assetsIds.length < 1) {
            throw new BadRequestException('No assets specified')
        }

        const assets = await this.assetsService.getAssets(createListDto.assetsIds);
        if(assets?.length < 1) {
            throw new NotFoundException('No assets found');
        }

        existingList.assets = assets
        existingList.name = createListDto.name;
        existingList.category = createListDto.category;
        existingList.description = createListDto.description;
        existingList.connected = UtilFuncs.getBoolean(createListDto.connected);
        existingList.archived = UtilFuncs.getBoolean(createListDto.archived);

        await existingList.save();
        delete existingList.user.rights;

        return existingList;
    }

    /**
     * delete list
     * @param listId identifier of list for delete
     * @param user user who wants to delete list
     */
    async deleteList(listId: number, user: User): Promise<void> {
        const list = await this.getList(listId);

        if (!list) {
            throw new NotFoundException('List not found!');
        }

        if (list.user.id !== user.id) {
            throw new UnauthorizedException('Forbidden!');
        }

        await list.remove();

        return;
    }
}

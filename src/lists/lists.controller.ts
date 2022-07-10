import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, ValidationPipe} from '@nestjs/common';
import {CreateListDto} from './dto/create-list.dto';
import {ListEntity} from './models/list.entity';
import {ListsService} from './lists.service';
import {GetUser} from '../users/utils/get-user.decorator';
import {User} from '../users/models/user.entity';
import {AuthGuard} from '@nestjs/passport';

@Controller('lists')
export class ListsController {

    constructor(private listsService: ListsService ) {
    }

    @Get()
    @UseGuards(AuthGuard())
    getLists(@GetUser() user: User): Promise<ListEntity[]> {
        return this.listsService.getLists(user)
    }

    @Post()
    @UseGuards(AuthGuard())
    createList(@Body(ValidationPipe) createListDto: CreateListDto, @GetUser() user: User): Promise<ListEntity> {
        return this.listsService.createList(createListDto, user);
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    updateList(@Param('id', ParseIntPipe) listId: number, @Body(ValidationPipe) createListDto: CreateListDto, @GetUser() user: User): Promise<ListEntity> {
        return this.listsService.updateList(listId, createListDto, user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    deleteList(@Param('id', ParseIntPipe) listId: number, @GetUser() user: User): Promise<void> {
        return this.listsService.deleteList(listId, user);
    }

}

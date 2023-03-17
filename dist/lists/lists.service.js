"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListsService = void 0;
const common_1 = require("@nestjs/common");
const list_entity_1 = require("./models/list.entity");
const assets_service_1 = require("../assets/assets.service");
const typeorm_1 = require("@nestjs/typeorm");
const utilFuncs_1 = require("../utils/utilFuncs");
const typeorm_2 = require("typeorm");
let ListsService = class ListsService {
    constructor(listsRepositories, assetsService) {
        this.listsRepositories = listsRepositories;
        this.assetsService = assetsService;
    }
    async getList(id) {
        return await this.listsRepositories.findOne({ where: { id } });
    }
    async createList(createListDto, user) {
        const { name, category, connected, archived, description, assetsIds } = createListDto;
        const assets = await this.assetsService.getAssets(assetsIds);
        if ((assets === null || assets === void 0 ? void 0 : assets.length) < 1) {
            throw new common_1.NotFoundException('No assets found');
        }
        const newList = new list_entity_1.ListEntity();
        newList.name = name;
        newList.category = category;
        newList.connected = utilFuncs_1.UtilFuncs.getBoolean(connected);
        newList.archived = utilFuncs_1.UtilFuncs.getBoolean(archived);
        newList.description = description;
        newList.assets = assets;
        newList.user = user;
        const savedList = await newList.save();
        delete savedList.user.rights;
        return savedList;
    }
    async getLists(user) {
        const query = await this.listsRepositories.createQueryBuilder('lists');
        query
            .leftJoinAndSelect('lists.user', 'users')
            .leftJoinAndSelect('lists.assets', 'assets')
            .select([
            'lists',
            'assets',
            'assets.user',
            'users.id',
            'users.name',
            'users.surname',
        ])
            .where('users.id = :id', { id: user.id });
        const found = query.getMany();
        return found;
    }
    async updateList(updatedListId, createListDto, user) {
        const existingList = await this.getList(updatedListId);
        if (!existingList) {
            throw new common_1.NotFoundException('List not found!');
        }
        if (existingList.user.id !== user.id) {
            throw new common_1.UnauthorizedException("You haven't got permission to do that");
        }
        if (createListDto.assetsIds.length < 1) {
            throw new common_1.BadRequestException('No assets specified');
        }
        const assets = await this.assetsService.getAssets(createListDto.assetsIds);
        if ((assets === null || assets === void 0 ? void 0 : assets.length) < 1) {
            throw new common_1.NotFoundException('No assets found');
        }
        existingList.assets = assets;
        existingList.name = createListDto.name;
        existingList.category = createListDto.category;
        existingList.description = createListDto.description;
        existingList.connected = utilFuncs_1.UtilFuncs.getBoolean(createListDto.connected);
        existingList.archived = utilFuncs_1.UtilFuncs.getBoolean(createListDto.archived);
        await existingList.save();
        delete existingList.user.rights;
        return existingList;
    }
    async deleteList(listId, user) {
        const list = await this.getList(listId);
        if (!list) {
            throw new common_1.NotFoundException('List not found!');
        }
        if (list.user.id !== user.id) {
            throw new common_1.UnauthorizedException('Forbidden!');
        }
        await list.remove();
        return;
    }
};
ListsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(list_entity_1.ListEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        assets_service_1.AssetsService])
], ListsService);
exports.ListsService = ListsService;
//# sourceMappingURL=lists.service.js.map
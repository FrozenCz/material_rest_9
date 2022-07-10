import {EntityRepository, Repository} from 'typeorm';
import {ListEntity} from '../models/list.entity';
import {User} from '../../users/models/user.entity';


@EntityRepository(ListEntity)
export class ListsRepositories extends Repository<ListEntity> {

    async getUserLists(user: User): Promise<ListEntity[]> {

        const query = await this.createQueryBuilder('lists');

        query
            .leftJoinAndSelect('lists.user', 'users')
            .leftJoinAndSelect('lists.assets', 'assets')
            .select(['lists', 'assets', 'assets.user', 'users.id', 'users.name', 'users.surname'])
            .where('users.id = :id', {id: user.id})
        const found = query.getMany();

        return found;
    }

}

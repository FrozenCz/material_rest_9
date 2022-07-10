import {Module} from '@nestjs/common';
import {ListsController} from './lists.controller';
import {ListsService} from './lists.service';
import {PassportModule} from '@nestjs/passport';
import {AssetsModule} from '../assets/assets.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ListsRepositories} from './repositories/lists.repositories';

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        AssetsModule,
        TypeOrmModule.forFeature([ListsRepositories]),
    ],
    controllers: [ListsController],
    providers: [ListsService]
})
export class ListsModule {
}

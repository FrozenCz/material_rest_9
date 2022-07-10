import {Module} from '@nestjs/common';

import {TypeOrmModule} from '@nestjs/typeorm';
import {PassportModule} from '@nestjs/passport';
import {RemovingProtocolsRepository} from './repositories/removingProtocolsRepository';
import {ProtocolsService} from './protocols.service';
import {ProtocolsControler} from './protocols.controler';


@Module({
    imports: [
        TypeOrmModule.forFeature([RemovingProtocolsRepository]),
        PassportModule.register({defaultStrategy: 'jwt'}),
    ],
    controllers: [ProtocolsControler],
    providers: [ProtocolsService],
    exports: [ProtocolsService]
})
export class ProtocolsModule {

}

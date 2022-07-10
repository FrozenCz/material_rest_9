import {Controller, Get} from '@nestjs/common';
import {ProtocolsService} from './protocols.service';
import {RemovingProtocol} from './models/protocols.entity';

@Controller('protocols')
export class ProtocolsControler {
    constructor(private protocolsService: ProtocolsService) {
    }

    @Get()
    getProtocols(): Promise<RemovingProtocol[]>{
        return this.protocolsService.getRemovingProtocolsList();
    }

    // @Get('/removing')
    // @UseGuards(AuthGuard())
    // getRemovingProtocolsList(@GetUser() user: User): Promise<any> {
    //     // return this.protocolsService.getRemovingProtocolsList(user);
    // }
}

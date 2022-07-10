import {Module} from '@nestjs/common';
import {WsGateway} from '../ws.gateway';


@Module({
    providers: [WsGateway],
    imports: [],
    exports: [WsGateway]
})
export class WsModule {

}

import { Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';

// subscribers are part of appModule due to API

@Module({
  providers: [WsGateway],
  imports: [],
  exports: [WsGateway],
})
export class WsModule {}

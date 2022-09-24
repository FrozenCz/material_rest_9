import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { BehaviorSubject } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { Assets } from '../assets/models/assets.entity';

export enum ChangeType {
  create,
  update,
  delete,
}

export interface AssetsChangeType {
  assets: Assets;
  changeType: ChangeType;
}

export enum SubscribeMessageEnum {
  assetsUpdate = 'assetsUpdate',
  categoryUpdate = 'categoryUpdate',
  categoryDelete = 'categoryDelete',
  usersUpdate = 'usersUpdate',
  usersDelete = 'usersDelete',
}

export interface WsChange {
  type: SubscribeMessageEnum;
  changes: any;
}

@WebSocketGateway({ cors: true })
export class WsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  logger: Logger = new Logger('Gateway');

  @WebSocketServer()
  server: Server;

  wsChanges$: BehaviorSubject<WsChange> = new BehaviorSubject<WsChange>(
    undefined,
  );

  afterInit(server: any): any {
    this.wsChanges$.subscribe((wsChange) => {
      this.server?.emit('changes', { data: wsChange });
    });
  }

  handleConnection(client: Socket, ...args: any[]): any {
    this.logger.log('client connected: ' + client.id);
  }

  handleDisconnect(client: Socket): any {
    this.logger.log('client disconnected: ' + client.id);
  }
}

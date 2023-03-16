import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { BehaviorSubject } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { Assets } from '../assets/models/assets.entity';
import { Location } from '../locations/models/location.entity';
import { AssetsModelDto } from '../assets/dto/out/assetModel.dto';
import { Category } from '../categories/models/category.entity';
import { UserOutDto } from '../users/dto/out/User.out.dto';

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
  locationUpdate = 'locationUpdate',
  locationDelete = 'locationDelete',
}

export interface WsUsersDelete {
  type: SubscribeMessageEnum.usersDelete;
  changes: UserOutDto[];
}

export interface WsUsersUpdate {
  type: SubscribeMessageEnum.usersUpdate;
  changes: UserOutDto[];
}

export interface WsCategoryDelete {
  type: SubscribeMessageEnum.categoryDelete;
  changes: number;
}

export interface WsCategoryUpdate {
  type: SubscribeMessageEnum.categoryUpdate;
  changes: Category;
}

export interface WsAssetsUpdate {
  type: SubscribeMessageEnum.assetsUpdate;
  changes: AssetsModelDto[];
}

export interface WsLocationUpdate {
  type: SubscribeMessageEnum.locationUpdate;
  changes: Location;
}

export interface WsLocationDelete {
  type: SubscribeMessageEnum.locationDelete;
  changes: null;
}

export type WsType =
  | WsUsersDelete
  | WsUsersUpdate
  | WsLocationUpdate
  | WsLocationDelete
  | WsAssetsUpdate
  | WsCategoryUpdate
  | WsCategoryDelete;

@WebSocketGateway({ cors: true })
export class WsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  logger: Logger = new Logger('Gateway');

  @WebSocketServer()
  server: Server;

  wsChanges$: BehaviorSubject<WsType> = new BehaviorSubject<WsType>(undefined);

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

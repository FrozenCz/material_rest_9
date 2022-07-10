import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import {BehaviorSubject, Observable} from 'rxjs';
import {Server} from 'ws';
import {map} from 'rxjs/operators';
import {Assets} from './assets/models/assets.entity';
import {Logger} from '@nestjs/common';

export enum ChangeType {
    create,
    update,
    delete
}

export interface AssetsChangeType {
    assets: Assets;
    changeType: ChangeType
}
export enum SubscribeMessageEnum {
    assetsUpdate = 'assetsUpdate',
    categoryUpdate = 'categoryUpdate',
    categoryDelete = 'categoryDelete',
    usersUpdate = 'usersUpdate',
    usersDelete = 'usersDelete'
}

export interface WsChange {
    type: SubscribeMessageEnum;
    changes: any;
}


@WebSocketGateway()
export class WsGateway {
    wsChanges$: BehaviorSubject<WsChange> = new BehaviorSubject<WsChange>(undefined);

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('ws')
    onChange(client: any, data: any): Observable<WsResponse<WsChange>> {
        Logger.debug('ano')
        return this.wsChanges$.pipe(map(wsChange => ({event: 'ws', data: wsChange})));
    }
}


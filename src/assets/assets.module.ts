import { forwardRef, Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { CategoriesModule } from '../categories/categories.module';
import { UsersModule } from '../users/users.module';
import { UnitsModule } from '../units/units.module';
import { ProtocolsModule } from '../protocols/protocols.module';
import { HistoryModule } from '../history/history.module';
import { WsModule } from '../websocket/ws.module';
import { Assets } from "./models/assets.entity";
import { AssetNote } from "./models/assetNote.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Assets, AssetNote]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => CategoriesModule),
    ProtocolsModule,
    forwardRef(() => UsersModule),
    UnitsModule,
    HistoryModule,
    WsModule,
  ],
  controllers: [],
  providers: [AssetsService],
  exports: [AssetsService],
})
export class AssetsModule {}

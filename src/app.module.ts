import { CacheModule, Module } from "@nestjs/common";
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UnitsModule } from './units/units.module';
import { CategoriesModule } from './categories/categories.module';
import { LocationsModule } from './locations/locations.module';
import { AssetsModule } from './assets/assets.module';
import { ListsModule } from './lists/lists.module';
import { ProtocolsModule } from './protocols/protocols.module';
import { HistoryModule } from './history/history.module';
import { WsModule } from './websocket/ws.module';
import { UsersController } from 'src/users/users.controller';
import { RightsController } from 'src/users/rights.controller';
import { UsersFacade } from 'src/facade/users.facade';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Api } from 'src/api';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleOptions } from 'src/config/jwt.config';
import { AuthController } from './auth/auth.controller';
import { AssetsController } from './assets/assets.controller';
import { AssetsFacade } from './facade/assets.facade';
import { LocationSubscriber } from './websocket/subscribers/location.subscriber';
import { LocationsController } from './locations/locations.controller';
import { LocationFacade } from "./facade/location.facade";

const controllers = [
  UsersController,
  RightsController,
  AuthController,
  AssetsController,
  LocationsController,
];

const subscribers = [LocationSubscriber];

const facades = [UsersFacade, AssetsFacade, LocationFacade];

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot({ envFilePath: [`.env.${process.env.STAGE}`] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        name: 'evNest',
        type: 'postgres',
        host: configService.get('HOST'),
        port: +configService.get<number>('PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        schema: configService.get('DATABASE_SCHEMA'),
        entities: [__dirname + '/**/*.entity.{ts,js}'],
        autoLoadEntities: true,
        synchronize: configService.get('SYNC'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(jwtModuleOptions),
    CategoriesModule,
    LocationsModule,
    UnitsModule,
    UsersModule,
    AssetsModule,
    ListsModule,
    ProtocolsModule,
    HistoryModule,
    WsModule,
  ],
  controllers: [...controllers],
  providers: [AppService, Api, ...facades, ...subscribers],
})
export class AppModule {}

import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UnitsModule } from '../units/units.module';
import { WsModule } from '../websocket/ws.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleOptions } from 'src/config/jwt.config';
import { RightsService } from 'src/users/rights.service';
import { User } from './models/user.entity';
import { Rights } from './models/rights.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Rights]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(jwtModuleOptions),
    forwardRef(() => UnitsModule),
    WsModule,
  ],
  controllers: [],
  providers: [UsersService, RightsService],
  exports: [UsersService, RightsService, TypeOrmModule],
})
export class UsersModule {}

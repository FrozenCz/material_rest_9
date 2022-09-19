import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleOptions } from '../config/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register(jwtModuleOptions),
    UsersModule,
  ],
  controllers: [],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}

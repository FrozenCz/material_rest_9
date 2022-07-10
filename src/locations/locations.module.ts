import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { UnitsModule } from '../units/units.module';
import { Location } from './models/location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    UnitsModule,
  ],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}

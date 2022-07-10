import { forwardRef, Module } from '@nestjs/common';
import { UnitsController } from './units.controller';
import { UsersModule } from '../users/users.module';
import { UnitsService } from './units.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Unit } from './unit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Unit]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => UsersModule),
  ],
  controllers: [UnitsController],
  providers: [UnitsService],
  exports: [UnitsService],
})
export class UnitsModule {}

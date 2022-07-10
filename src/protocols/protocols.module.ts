import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ProtocolsService } from './protocols.service';
import { ProtocolsControler } from './protocols.controler';
import { RemovingProtocol } from './models/protocols.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RemovingProtocol]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ProtocolsControler],
  providers: [ProtocolsService],
  exports: [ProtocolsService],
})
export class ProtocolsModule {}

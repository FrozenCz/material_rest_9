import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoggingInterceptor } from "./logging.interceptor";

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
  ],
  providers: [LoggingInterceptor],
  exports: [LoggingInterceptor],
})
export class ProtocolsModule {}

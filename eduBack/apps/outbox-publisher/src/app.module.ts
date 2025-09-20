import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { ConfigModule, DatabaseModule } from '@libs/core/src';

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [PublisherService],
})
export class AppModule {}

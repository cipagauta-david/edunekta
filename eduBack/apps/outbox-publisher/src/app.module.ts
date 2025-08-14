import { Module } from '@nestjs/common';
import { ConfigModule } from '@app/core/config/config.module';
import { DatabaseModule } from '@app/core/database/database.module';
import { PublisherService } from './publisher.service';

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [PublisherService],
})
export class AppModule {}

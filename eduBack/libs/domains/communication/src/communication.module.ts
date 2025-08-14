import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Foro } from './entities/foro.entity';
import { ForumsController } from './infrastructure/controllers/forums.controller';
import { ForumsService } from './infrastructure/services/forums.service';

@Module({
  imports: [TypeOrmModule.forFeature([Foro])],
  controllers: [ForumsController],
  providers: [ForumsService],
  exports: [ForumsService],
})
export class CommunicationModule {}

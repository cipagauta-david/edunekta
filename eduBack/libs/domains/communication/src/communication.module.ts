import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Foro } from './entities/foro.entity';
import { ForumsController } from './infrastructure/controllers/forums.controller';
import { ForumsService } from './infrastructure/services/forums.service';
import { ComentarioForoDAO, ConversacionDAO, ForoDAO } from './infrastructure/dao';
import { ComentarioForo } from './entities/comentario-foro.entity';
import { ComentarioForoController } from './infrastructure/controllers/comentario-foro.controller';
import { ComentarioForoService } from './infrastructure/services/comentario-foro.service';
import { Conversacion } from './entities/conversacion.entity';
import { ConversacionController } from './infrastructure/controllers/conversacion.controller';
import { ConversacionService } from './infrastructure/services/conversacion.service';

@Module({
  imports: [TypeOrmModule.forFeature([Foro, ComentarioForo, Conversacion])],
  controllers: [ForumsController, ComentarioForoController, ConversacionController],
  providers: [ForumsService, ForoDAO, ComentarioForoService, ComentarioForoDAO, ConversacionService, ConversacionDAO],
  exports: [ForumsService, ForoDAO, ComentarioForoService, ComentarioForoDAO, ConversacionService, ConversacionDAO],
})
export class CommunicationModule {}

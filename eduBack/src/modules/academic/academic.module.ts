import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicService } from './services/academic.service';
import { AcademicController } from './controllers/academic.controller';
import { Actividad } from './activities/entities/actividad.entity';
import { Asignatura } from './subjects/entities/asignatura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Actividad, Asignatura])],
  controllers: [AcademicController],
  providers: [AcademicService],
  exports: [AcademicService],
})
export class AcademicModule {}


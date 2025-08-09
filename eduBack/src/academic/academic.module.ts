import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicService } from './academic.service';
import { AcademicController } from './academic.controller';
import { Actividad } from '../entities/actividad.entity';
import { Asignatura } from '../entities/asignatura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Actividad, Asignatura])],
  controllers: [AcademicController],
  providers: [AcademicService],
  exports: [AcademicService],
})
export class AcademicModule {}

import { Injectable } from '@nestjs/common';
import { CalificacionPeriodoDao } from '../daos/calificacion-periodo.dao';
import { CreateCalificacionPeriodoDto } from '../dto/create-calificacion-periodo.dto';
import { UpdateCalificacionPeriodoDto } from '../dto/update-calificacion-periodo.dto';

@Injectable()
export class TermGradesService {
  constructor(private readonly dao: CalificacionPeriodoDao) {}

  findAll(institucionId?: number) {
    return this.dao.findAll(institucionId);
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  create(dto: CreateCalificacionPeriodoDto) {
    return this.dao.create(dto);
  }

  update(id: number, dto: UpdateCalificacionPeriodoDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

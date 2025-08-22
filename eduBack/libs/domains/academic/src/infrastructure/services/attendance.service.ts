import { Injectable } from '@nestjs/common';
import { AsistenciaDao } from '../daos/asistencia.dao';
import { CreateAsistenciaDto } from '../dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from '../dto/update-asistencia.dto';

@Injectable()
export class AttendanceService {
  constructor(private readonly dao: AsistenciaDao) {}

  findAll(institucionId?: number) {
    return this.dao.findAll(institucionId);
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  create(dto: CreateAsistenciaDto) {
    return this.dao.create(dto);
  }

  update(id: number, dto: UpdateAsistenciaDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

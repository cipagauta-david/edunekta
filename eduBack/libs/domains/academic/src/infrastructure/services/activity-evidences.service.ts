import { Injectable } from '@nestjs/common';
import { EvidenciaActividadDao } from '../daos/evidencia-actividad.dao';
import { CreateEvidenciaActividadDto } from '../dto/create-evidencia-actividad.dto';
import { UpdateEvidenciaActividadDto } from '../dto/update-evidencia-actividad.dto';

@Injectable()
export class ActivityEvidencesService {
  constructor(private readonly dao: EvidenciaActividadDao) {}

  findAll(institucionId?: number) {
    return this.dao.findAll(institucionId);
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  create(dto: CreateEvidenciaActividadDto) {
    return this.dao.create(dto);
  }

  update(id: number, dto: UpdateEvidenciaActividadDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

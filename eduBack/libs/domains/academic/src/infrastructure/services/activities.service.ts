import { Injectable } from '@nestjs/common';
import { ActividadDao } from '../daos/actividad.dao';
import { CreateActividadDto } from '../dto/create-actividad.dto';
import { UpdateActividadDto } from '../dto/update-actividad.dto';

@Injectable()
export class ActivitiesService {
  constructor(private readonly dao: ActividadDao) {}

  findAll(institucionId?: number) {
    return this.dao.findAll(institucionId);
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  create(dto: CreateActividadDto) {
    return this.dao.create(dto);
  }

  update(id: number, dto: UpdateActividadDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

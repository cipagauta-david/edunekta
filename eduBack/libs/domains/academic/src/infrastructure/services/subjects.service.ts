import { Injectable } from '@nestjs/common';
import { AsignaturaDao } from '../daos/asignatura.dao';
import { CreateAsignaturaDto } from '../dto/create-asignatura.dto';
import { UpdateAsignaturaDto } from '../dto/update-asignatura.dto';

@Injectable()
export class SubjectsService {
  constructor(private readonly dao: AsignaturaDao) {}

  findAll(institucionId?: number) {
    return this.dao.findAll(institucionId);
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  create(dto: CreateAsignaturaDto) {
    return this.dao.create(dto);
  }

  update(id: number, dto: UpdateAsignaturaDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

import { Injectable } from '@nestjs/common';
import { MatriculaDao } from '../daos/matricula.dao';
import { CreateMatriculaDto } from '../dto/create-matricula.dto';
import { UpdateMatriculaDto } from '../dto/update-matricula.dto';

@Injectable()
export class EnrollmentsService {
  constructor(private readonly dao: MatriculaDao) {}

  findAll(institucionId?: number) {
    return this.dao.findAll(institucionId);
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  create(dto: CreateMatriculaDto) {
    return this.dao.create(dto);
  }

  update(id: number, dto: UpdateMatriculaDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

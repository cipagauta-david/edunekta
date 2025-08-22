import { Injectable } from '@nestjs/common';
import { GradoDao } from '../daos/grado.dao';
import { CreateGradoDto } from '../dto/create-grado.dto';
import { UpdateGradoDto } from '../dto/update-grado.dto';

@Injectable()
export class GradesService {
  constructor(private readonly dao: GradoDao) {}

  findAll(institucionId?: number) {
    return this.dao.findAll(institucionId);
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  create(dto: CreateGradoDto) {
    return this.dao.create(dto);
  }

  update(id: number, dto: UpdateGradoDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

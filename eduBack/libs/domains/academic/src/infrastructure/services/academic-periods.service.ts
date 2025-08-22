import { Injectable } from '@nestjs/common';
import { PeriodoAcademicoDao } from '../daos/periodo-academico.dao';
import { CreatePeriodoAcademicoDto } from '../dto/create-periodo-academico.dto';
import { UpdatePeriodoAcademicoDto } from '../dto/update-periodo-academico.dto';

@Injectable()
export class AcademicPeriodsService {
  constructor(private readonly dao: PeriodoAcademicoDao) {}

  findAll(institucionId?: number) {
    return this.dao.findAll(institucionId);
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  create(dto: CreatePeriodoAcademicoDto) {
    return this.dao.create(dto);
  }

  update(id: number, dto: UpdatePeriodoAcademicoDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

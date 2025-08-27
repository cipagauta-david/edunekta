import { Injectable } from '@nestjs/common';
import { NivelAcademicoDao } from '../daos/nivel-academico.dao';
import { CreateNivelAcademicoDto } from '../dto/create-nivel-academico.dto';
import { UpdateNivelAcademicoDto } from '../dto/update-nivel-academico.dto';

@Injectable()
export class AcademicLevelsService {
  constructor(private readonly dao: NivelAcademicoDao) {}

  findAll(institucionId?: number) {
    return this.dao.findAll(institucionId);
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  create(dto: CreateNivelAcademicoDto) {
    return this.dao.create(dto);
  }

  update(id: number, dto: UpdateNivelAcademicoDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

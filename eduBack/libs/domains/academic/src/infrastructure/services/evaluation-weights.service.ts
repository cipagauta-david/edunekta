import { Injectable } from '@nestjs/common';
import { PonderacionEvaluacionDao } from '../daos/ponderacion-evaluacion.dao';
import { CreatePonderacionEvaluacionDto } from '../dto/create-ponderacion-evaluacion.dto';
import { UpdatePonderacionEvaluacionDto } from '../dto/update-ponderacion-evaluacion.dto';

@Injectable()
export class EvaluationWeightsService {
  constructor(private readonly dao: PonderacionEvaluacionDao) {}

  findAll(institucionId?: number) {
    return this.dao.findAll(institucionId);
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  create(dto: CreatePonderacionEvaluacionDto) {
    return this.dao.create(dto);
  }

  update(id: number, dto: UpdatePonderacionEvaluacionDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

import { Injectable } from '@nestjs/common';
import {
  CreateEstudianteAcudienteDto,
  UpdateEstudianteAcudienteDto,
} from '../../dto';
import { EstudianteAcudienteDAO } from '../dao';

@Injectable()
export class EstudianteAcudienteService {
  constructor(private readonly dao: EstudianteAcudienteDAO) {}

  create(dto: CreateEstudianteAcudienteDto) {
    return this.dao.create(dto);
  }

  findAll() {
    return this.dao.findAll();
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  update(id: number, dto: UpdateEstudianteAcudienteDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

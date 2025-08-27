import { Injectable } from '@nestjs/common';
import { CreateMensajeDto, UpdateMensajeDto } from '../../application/dtos';
import { MensajeDAO } from '../dao';

@Injectable()
export class MensajeService {
  constructor(private readonly dao: MensajeDAO) {}

  findAll() {
    return this.dao.findAll();
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  create(dto: CreateMensajeDto) {
    return this.dao.create(dto);
  }

  update(id: number, dto: UpdateMensajeDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

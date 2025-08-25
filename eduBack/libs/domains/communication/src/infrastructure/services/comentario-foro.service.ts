import { Injectable } from '@nestjs/common';
import { CreateComentarioForoDto, UpdateComentarioForoDto } from '../../application/dtos';
import { ComentarioForoDAO } from '../dao';

@Injectable()
export class ComentarioForoService {
  constructor(private readonly dao: ComentarioForoDAO) {}

  findAll() {
    return this.dao.findAll();
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  create(dto: CreateComentarioForoDto) {
    return this.dao.create(dto);
  }

  update(id: number, dto: UpdateComentarioForoDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

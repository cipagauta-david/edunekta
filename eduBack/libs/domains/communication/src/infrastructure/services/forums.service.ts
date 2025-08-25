import { Injectable } from '@nestjs/common';
import { CreateForoDto, UpdateForoDto } from '../../application/dtos';
import { ForoDAO } from '../dao';

@Injectable()
export class ForumsService {
  constructor(private readonly dao: ForoDAO) {}

  findAll(institucionId?: number) {
    return this.dao.findAll(institucionId);
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  create(dto: CreateForoDto) {
    return this.dao.create(dto);
  }

  update(id: number, dto: UpdateForoDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateConversacionDto, UpdateConversacionDto } from '../../application/dtos';
import { ConversacionDAO } from '../dao';

@Injectable()
export class ConversacionService {
  constructor(private readonly dao: ConversacionDAO) {}

  findAll() {
    return this.dao.findAll();
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  create(dto: CreateConversacionDto) {
    return this.dao.create(dto);
  }

  update(id: number, dto: UpdateConversacionDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

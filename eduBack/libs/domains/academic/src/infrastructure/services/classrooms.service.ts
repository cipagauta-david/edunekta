import { Injectable } from '@nestjs/common';
import { AulaDao } from '../daos/aula.dao';
import { CreateAulaDto } from '../dto/create-aula.dto';
import { UpdateAulaDto } from '../dto/update-aula.dto';

@Injectable()
export class ClassroomsService {
  constructor(private readonly dao: AulaDao) {}

  findAll(institucionId?: number) {
    return this.dao.findAll(institucionId);
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  create(dto: CreateAulaDto) {
    return this.dao.create(dto);
  }

  update(id: number, dto: UpdateAulaDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

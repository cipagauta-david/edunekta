import { Injectable } from '@nestjs/common';
import { ClaseDao } from '../daos/clase.dao';
import { CreateClaseDto } from '../dto/create-clase.dto';
import { UpdateClaseDto } from '../dto/update-clase.dto';

@Injectable()
export class ClassesService {
  constructor(private readonly dao: ClaseDao) {}

  findAll(institucionId?: number) {
    return this.dao.findAll(institucionId);
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  create(dto: CreateClaseDto) {
    return this.dao.create(dto);
  }

  update(id: number, dto: UpdateClaseDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

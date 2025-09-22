import { Injectable } from '@nestjs/common';
import { PermisoDao } from '../dao';
import { CreatePermisoDto, UpdatePermisoDto } from '../../dto';

@Injectable()
export class PermisoService {
  constructor(private readonly dao: PermisoDao) {}

  create(dto: CreatePermisoDto) {
    return this.dao.create(dto);
  }

  findAll() {
    return this.dao.findAll();
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  update(id: number, dto: UpdatePermisoDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

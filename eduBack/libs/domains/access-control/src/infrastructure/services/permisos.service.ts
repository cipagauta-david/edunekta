import { Injectable } from '@nestjs/common';
import { PermisoDao } from '../daos/permiso.dao';
import { CreatePermisoDto } from '../dto/create-permiso.dto';
import { UpdatePermisoDto } from '../dto/update-permiso.dto';

@Injectable()
export class PermisosService {
  constructor(private readonly dao: PermisoDao) {}

  findAll() {
    return this.dao.findAll();
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  create(dto: CreatePermisoDto) {
    return this.dao.create(dto);
  }

  update(id: number, dto: UpdatePermisoDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

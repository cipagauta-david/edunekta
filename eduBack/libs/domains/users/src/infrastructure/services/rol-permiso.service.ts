import { Injectable } from '@nestjs/common';
import { RolPermisoDao } from '../dao/rol-permiso.dao';
import { CreateRolPermisoDto, UpdateRolPermisoDto } from '../../dto';

@Injectable()
export class RolPermisoService {
  constructor(private readonly dao: RolPermisoDao) {}

  create(dto: CreateRolPermisoDto) {
    return this.dao.create(dto);
  }

  findAll() {
    return this.dao.findAll();
  }

  findOne(rolId: number, permisoId: number) {
    return this.dao.findOne(rolId, permisoId);
  }

  update(rolId: number, permisoId: number, dto: UpdateRolPermisoDto) {
    return this.dao.update(rolId, permisoId, dto);
  }

  remove(rolId: number, permisoId: number) {
    return this.dao.remove(rolId, permisoId);
  }
}

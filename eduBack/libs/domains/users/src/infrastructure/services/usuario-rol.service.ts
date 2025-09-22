import { Injectable } from '@nestjs/common';
import { UsuarioRolDao } from '../dao/usuario-rol.dao';
import { CreateUsuarioRolDto, UpdateUsuarioRolDto } from '../../dto';

@Injectable()
export class UsuarioRolService {
  constructor(private readonly dao: UsuarioRolDao) {}

  create(dto: CreateUsuarioRolDto) {
    return this.dao.create(dto);
  }

  findAll() {
    return this.dao.findAll();
  }

  findOne(usuarioId: number, rolId: number) {
    return this.dao.findOne(usuarioId, rolId);
  }

  update(usuarioId: number, rolId: number, dto: UpdateUsuarioRolDto) {
    return this.dao.update(usuarioId, rolId, dto);
  }

  remove(usuarioId: number, rolId: number) {
    return this.dao.remove(usuarioId, rolId);
  }
}

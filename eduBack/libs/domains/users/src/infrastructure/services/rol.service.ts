import { Injectable } from '@nestjs/common';
import { RolDao } from '../dao/rol.dao';
import { CreateRolDto, UpdateRolDto } from '../../dto';

@Injectable()
export class RolService {
  constructor(private readonly dao: RolDao) {}

  create(dto: CreateRolDto) {
    return this.dao.create(dto);
  }

  findAll() {
    return this.dao.findAll();
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  update(id: number, dto: UpdateRolDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

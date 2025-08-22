import { Injectable } from '@nestjs/common';
import { RoleDao } from '../daos/role.dao';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly dao: RoleDao) {}

  findAll() {
    return this.dao.findAll();
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  create(dto: CreateRoleDto) {
    return this.dao.create(dto);
  }

  update(id: number, dto: UpdateRoleDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

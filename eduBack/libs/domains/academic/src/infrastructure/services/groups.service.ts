import { Injectable } from '@nestjs/common';
import { GrupoDao } from '../daos/grupo.dao';
import { CreateGrupoDto } from '../dto/create-grupo.dto';
import { UpdateGrupoDto } from '../dto/update-grupo.dto';

@Injectable()
export class GroupsService {
  constructor(private readonly dao: GrupoDao) {}

  findAll(institucionId?: number) {
    return this.dao.findAll(institucionId);
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  create(dto: CreateGrupoDto) {
    return this.dao.create(dto);
  }

  update(id: number, dto: UpdateGrupoDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

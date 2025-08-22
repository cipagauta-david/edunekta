import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from '../../entities/role.entity';
import { Permiso } from '../../entities/permiso.entity';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class RoleDao {
  constructor(
    @InjectRepository(Role)
    private readonly repo: Repository<Role>,
    @InjectRepository(Permiso)
    private readonly permisosRepo: Repository<Permiso>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['permisos'] });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id }, relations: ['permisos'] });
    if (!entity) throw new NotFoundException('Rol no encontrado');
    return entity;
  }

  async create(dto: CreateRoleDto) {
    const entity = this.repo.create(dto);
    if (dto.permisos) {
      entity.permisos = await this.permisosRepo.findBy({ id: In(dto.permisos) });
    }
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateRoleDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    if (dto.permisos) {
      entity.permisos = await this.permisosRepo.findBy({ id: In(dto.permisos) });
    }
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolPermiso } from '../../entities/rol-permiso.entity';

@Injectable()
export class RolPermisoDao {
  constructor(
    @InjectRepository(RolPermiso)
    private readonly repository: Repository<RolPermiso>,
  ) {}

  create(dto: Record<string, any>): Promise<RolPermiso> {
    const entity = this.repository.create(dto);
    return this.repository.save(entity);
  }

  findAll(): Promise<RolPermiso[]> {
    return this.repository.find();
  }

  async findOne(rolId: number, permisoId: number): Promise<RolPermiso> {
    const entity = await this.repository.findOne({ where: { rolId, permisoId } });
    if (!entity) throw new NotFoundException('RolPermiso not found');
    return entity;
  }

  async update(rolId: number, permisoId: number, dto: Record<string, any>): Promise<RolPermiso> {
    const entity = await this.findOne(rolId, permisoId);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(rolId: number, permisoId: number): Promise<RolPermiso> {
    const entity = await this.findOne(rolId, permisoId);
    await this.repository.remove(entity);
    return entity;
  }
}

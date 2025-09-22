import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permiso } from '../../entities/permiso.entity';

@Injectable()
export class PermisoDao {
  constructor(
    @InjectRepository(Permiso)
    private readonly repository: Repository<Permiso>,
  ) {}

  create(dto: Record<string, any>): Promise<Permiso> {
    const entity = this.repository.create(dto);
    return this.repository.save(entity);
  }

  findAll(): Promise<Permiso[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Permiso> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Permiso not found');
    return entity;
  }

  async update(id: number, dto: Record<string, any>): Promise<Permiso> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(id: number): Promise<Permiso> {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
    return entity;
  }
}

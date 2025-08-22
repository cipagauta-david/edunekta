import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permiso } from '../../entities/permiso.entity';
import { CreatePermisoDto } from '../dto/create-permiso.dto';
import { UpdatePermisoDto } from '../dto/update-permiso.dto';

@Injectable()
export class PermisoDao {
  constructor(
    @InjectRepository(Permiso)
    private readonly repo: Repository<Permiso>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['roles'] });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id }, relations: ['roles'] });
    if (!entity) throw new NotFoundException('Permiso no encontrado');
    return entity;
  }

  create(dto: CreatePermisoDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdatePermisoDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

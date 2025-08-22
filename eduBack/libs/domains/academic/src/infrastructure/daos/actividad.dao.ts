import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actividad } from '../../entities/actividad.entity';
import { CreateActividadDto } from '../dto/create-actividad.dto';
import { UpdateActividadDto } from '../dto/update-actividad.dto';

@Injectable()
export class ActividadDao {
  constructor(
    @InjectRepository(Actividad)
    private readonly repo: Repository<Actividad>,
  ) {}

  findAll(institucionId?: number) {
    return this.repo.find({ where: institucionId ? { institucionId } : {} });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Actividad no encontrada');
    return entity;
  }

  create(dto: CreateActividadDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateActividadDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

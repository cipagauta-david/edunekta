import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asistencia } from '../../entities/asistencia.entity';
import { CreateAsistenciaDto } from '../dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from '../dto/update-asistencia.dto';

@Injectable()
export class AsistenciaDao {
  constructor(
    @InjectRepository(Asistencia)
    private readonly repo: Repository<Asistencia>,
  ) {}

  findAll(institucionId?: number) {
    return this.repo.find({ where: institucionId ? { institucionId } : {} });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Asistencia no encontrada');
    return entity;
  }

  create(dto: CreateAsistenciaDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateAsistenciaDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

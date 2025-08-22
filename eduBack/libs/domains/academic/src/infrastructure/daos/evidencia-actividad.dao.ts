import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EvidenciaActividad } from '../../entities/evidencia-actividad.entity';
import { CreateEvidenciaActividadDto } from '../dto/create-evidencia-actividad.dto';
import { UpdateEvidenciaActividadDto } from '../dto/update-evidencia-actividad.dto';

@Injectable()
export class EvidenciaActividadDao {
  constructor(
    @InjectRepository(EvidenciaActividad)
    private readonly repo: Repository<EvidenciaActividad>,
  ) {}

  findAll(institucionId?: number) {
    return this.repo.find({ where: institucionId ? { institucionId } : {} });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Evidencia de actividad no encontrada');
    return entity;
  }

  create(dto: CreateEvidenciaActividadDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateEvidenciaActividadDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

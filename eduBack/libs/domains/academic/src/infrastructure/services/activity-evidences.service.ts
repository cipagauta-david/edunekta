import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EvidenciaActividad } from '../../entities/evidencia-actividad.entity';

@Injectable()
export class ActivityEvidencesService {
  constructor(@InjectRepository(EvidenciaActividad) private readonly repo: Repository<EvidenciaActividad>) {}

  findAll(institucionId?: number) {
    return this.repo.find({ where: (institucionId ? { institucionId } : {}) as any });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Evidencia de actividad no encontrada');
    return entity;
  }

  create(dto: Partial<EvidenciaActividad>) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: Partial<EvidenciaActividad>) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

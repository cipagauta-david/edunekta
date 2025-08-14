import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalificacionPeriodo } from '../../entities/calificacion-periodo.entity';

@Injectable()
export class TermGradesService {
  constructor(@InjectRepository(CalificacionPeriodo) private readonly repo: Repository<CalificacionPeriodo>) {}

  findAll(institucionId?: number) {
    return this.repo.find({ where: (institucionId ? { institucionId } : {}) as any });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Calificación de periodo no encontrada');
    return entity;
  }

  create(dto: Partial<CalificacionPeriodo>) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: Partial<CalificacionPeriodo>) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

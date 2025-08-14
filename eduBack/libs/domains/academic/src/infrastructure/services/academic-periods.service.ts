import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeriodoAcademico } from '../../entities/periodo-academico.entity';

@Injectable()
export class AcademicPeriodsService {
  constructor(@InjectRepository(PeriodoAcademico) private readonly repo: Repository<PeriodoAcademico>) {}

  findAll(institucionId?: number) {
    return this.repo.find({ where: (institucionId ? { institucionId } : {}) as any });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Periodo académico no encontrado');
    return entity;
  }

  create(dto: Partial<PeriodoAcademico>) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: Partial<PeriodoAcademico>) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

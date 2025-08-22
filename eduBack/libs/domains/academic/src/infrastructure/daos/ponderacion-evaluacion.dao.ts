import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PonderacionEvaluacion } from '../../entities/ponderacion-evaluacion.entity';
import { CreatePonderacionEvaluacionDto } from '../dto/create-ponderacion-evaluacion.dto';
import { UpdatePonderacionEvaluacionDto } from '../dto/update-ponderacion-evaluacion.dto';

@Injectable()
export class PonderacionEvaluacionDao {
  constructor(
    @InjectRepository(PonderacionEvaluacion)
    private readonly repo: Repository<PonderacionEvaluacion>,
  ) {}

  findAll(institucionId?: number) {
    return this.repo.find({ where: institucionId ? { institucionId } : {} });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Ponderación de evaluación no encontrada');
    return entity;
  }

  create(dto: CreatePonderacionEvaluacionDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdatePonderacionEvaluacionDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

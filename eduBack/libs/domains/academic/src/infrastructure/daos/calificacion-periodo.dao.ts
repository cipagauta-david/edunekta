import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalificacionPeriodo } from '../../entities/calificacion-periodo.entity';
import { CreateCalificacionPeriodoDto } from '../dto/create-calificacion-periodo.dto';
import { UpdateCalificacionPeriodoDto } from '../dto/update-calificacion-periodo.dto';

@Injectable()
export class CalificacionPeriodoDao {
  constructor(
    @InjectRepository(CalificacionPeriodo)
    private readonly repo: Repository<CalificacionPeriodo>,
  ) {}

  findAll(institucionId?: number) {
    return this.repo.find({ where: institucionId ? { institucionId } : {} });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Calificación de periodo no encontrada');
    return entity;
  }

  create(dto: CreateCalificacionPeriodoDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateCalificacionPeriodoDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

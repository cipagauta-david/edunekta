import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeriodoAcademico } from '../../entities/periodo-academico.entity';
import { CreatePeriodoAcademicoDto } from '../dto/create-periodo-academico.dto';
import { UpdatePeriodoAcademicoDto } from '../dto/update-periodo-academico.dto';

@Injectable()
export class PeriodoAcademicoDao {
  constructor(
    @InjectRepository(PeriodoAcademico)
    private readonly repo: Repository<PeriodoAcademico>,
  ) {}

  findAll(institucionId?: number) {
    return this.repo.find({ where: institucionId ? { institucionId } : {} });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Periodo académico no encontrado');
    return entity;
  }

  create(dto: CreatePeriodoAcademicoDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdatePeriodoAcademicoDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

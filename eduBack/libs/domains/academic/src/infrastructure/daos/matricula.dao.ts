import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Matricula } from '../../entities/matricula.entity';
import { CreateMatriculaDto } from '../dto/create-matricula.dto';
import { UpdateMatriculaDto } from '../dto/update-matricula.dto';

@Injectable()
export class MatriculaDao {
  constructor(
    @InjectRepository(Matricula)
    private readonly repo: Repository<Matricula>,
  ) {}

  findAll(institucionId?: number) {
    return this.repo.find({ where: institucionId ? { institucionId } : {} });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Matrícula no encontrada');
    return entity;
  }

  create(dto: CreateMatriculaDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateMatriculaDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

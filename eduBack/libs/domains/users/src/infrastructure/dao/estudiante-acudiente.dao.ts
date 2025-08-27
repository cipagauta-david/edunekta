import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteAcudiente } from '../../entities/estudiante-acudiente.entity';
import {
  CreateEstudianteAcudienteDto,
  UpdateEstudianteAcudienteDto,
} from '../../dto';

@Injectable()
export class EstudianteAcudienteDAO {
  constructor(
    @InjectRepository(EstudianteAcudiente)
    private readonly repository: Repository<EstudianteAcudiente>,
  ) {}

  create(dto: CreateEstudianteAcudienteDto) {
    const entity = this.repository.create(dto);
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Relación no encontrada');
    return entity;
  }

  async update(id: number, dto: UpdateEstudianteAcudienteDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
    return entity;
  }
}

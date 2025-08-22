import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignatura } from '../../entities/asignatura.entity';
import { CreateAsignaturaDto } from '../dto/create-asignatura.dto';
import { UpdateAsignaturaDto } from '../dto/update-asignatura.dto';

@Injectable()
export class AsignaturaDao {
  constructor(
    @InjectRepository(Asignatura)
    private readonly repo: Repository<Asignatura>,
  ) {}

  findAll(institucionId?: number) {
    return this.repo.find({ where: institucionId ? { institucionId } : {} });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Asignatura no encontrada');
    return entity;
  }

  create(dto: CreateAsignaturaDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateAsignaturaDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

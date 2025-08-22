import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grado } from '../../entities/grado.entity';
import { CreateGradoDto } from '../dto/create-grado.dto';
import { UpdateGradoDto } from '../dto/update-grado.dto';

@Injectable()
export class GradoDao {
  constructor(
    @InjectRepository(Grado)
    private readonly repo: Repository<Grado>,
  ) {}

  findAll(institucionId?: number) {
    return this.repo.find({ where: institucionId ? { institucionId } : {} });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Grado no encontrado');
    return entity;
  }

  create(dto: CreateGradoDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateGradoDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

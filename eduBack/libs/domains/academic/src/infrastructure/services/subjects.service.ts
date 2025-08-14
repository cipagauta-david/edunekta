import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignatura } from '../../entities/asignatura.entity';

@Injectable()
export class SubjectsService {
  constructor(@InjectRepository(Asignatura) private readonly repo: Repository<Asignatura>) {}

  findAll(institucionId?: number) {
    return this.repo.find({ where: (institucionId ? { institucionId } : {}) as any });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Asignatura no encontrada');
    return entity;
  }

  create(dto: Partial<Asignatura>) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: Partial<Asignatura>) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

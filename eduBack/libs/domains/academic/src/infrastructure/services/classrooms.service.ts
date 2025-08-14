import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aula } from '../../entities/aula.entity';

@Injectable()
export class ClassroomsService {
  constructor(@InjectRepository(Aula) private readonly repo: Repository<Aula>) {}

  findAll(institucionId?: number) {
    return this.repo.find({ where: (institucionId ? { institucionId } : {}) as any });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Aula no encontrada');
    return entity;
  }

  create(dto: Partial<Aula>) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: Partial<Aula>) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

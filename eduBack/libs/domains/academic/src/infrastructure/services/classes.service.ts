import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clase } from '../../entities/clase.entity';

@Injectable()
export class ClassesService {
  constructor(@InjectRepository(Clase) private readonly repo: Repository<Clase>) {}

  findAll(institucionId?: number) {
    return this.repo.find({ where: (institucionId ? { institucionId } : {}) as any });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Clase no encontrada');
    return entity;
  }

  create(dto: Partial<Clase>) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: Partial<Clase>) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

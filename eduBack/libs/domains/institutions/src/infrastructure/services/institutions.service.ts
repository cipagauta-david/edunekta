import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Institucion } from '../../entities/institucion.entity';

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectRepository(Institucion)
    private readonly repo: Repository<Institucion>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const inst = await this.repo.findOne({ where: { id } });
    if (!inst) throw new NotFoundException('Institución no encontrada');
    return inst;
  }

  create(dto: Partial<Institucion>) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: Partial<Institucion>) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

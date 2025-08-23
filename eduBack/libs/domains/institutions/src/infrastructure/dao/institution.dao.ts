import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Institucion } from '../../entities/institucion.entity';
import { CreateInstitutionDto, UpdateInstitutionDto } from '../../application/dtos';

@Injectable()
export class InstitutionDAO {
  constructor(
    @InjectRepository(Institucion)
    private readonly repository: Repository<Institucion>,
  ) {}

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const inst = await this.repository.findOne({ where: { id } });
    if (!inst) throw new NotFoundException('Institución no encontrada');
    return inst;
  }

  create(dto: CreateInstitutionDto) {
    const entity = this.repository.create(dto);
    return this.repository.save(entity);
  }

  async update(id: number, dto: UpdateInstitutionDto) {
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

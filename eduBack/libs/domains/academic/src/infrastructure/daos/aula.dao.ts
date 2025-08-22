import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aula } from '../../entities/aula.entity';
import { CreateAulaDto } from '../dto/create-aula.dto';
import { UpdateAulaDto } from '../dto/update-aula.dto';

@Injectable()
export class AulaDao {
  constructor(
    @InjectRepository(Aula)
    private readonly repo: Repository<Aula>,
  ) {}

  findAll(institucionId?: number) {
    return this.repo.find({ where: institucionId ? { institucionId } : {} });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Aula no encontrada');
    return entity;
  }

  create(dto: CreateAulaDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateAulaDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

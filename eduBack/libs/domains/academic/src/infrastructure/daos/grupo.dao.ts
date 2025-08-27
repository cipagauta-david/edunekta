import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grupo } from '../../entities/grupo.entity';
import { CreateGrupoDto } from '../dto/create-grupo.dto';
import { UpdateGrupoDto } from '../dto/update-grupo.dto';

@Injectable()
export class GrupoDao {
  constructor(
    @InjectRepository(Grupo)
    private readonly repo: Repository<Grupo>,
  ) {}

  findAll(institucionId?: number) {
    return this.repo.find({ where: institucionId ? { institucionId } : {} });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Grupo no encontrado');
    return entity;
  }

  create(dto: CreateGrupoDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateGrupoDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

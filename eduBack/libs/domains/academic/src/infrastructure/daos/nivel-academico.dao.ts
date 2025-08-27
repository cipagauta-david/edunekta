import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NivelAcademico } from '../../entities/nivel-academico.entity';
import { CreateNivelAcademicoDto } from '../dto/create-nivel-academico.dto';
import { UpdateNivelAcademicoDto } from '../dto/update-nivel-academico.dto';

@Injectable()
export class NivelAcademicoDao {
  constructor(
    @InjectRepository(NivelAcademico)
    private readonly repo: Repository<NivelAcademico>,
  ) {}

  findAll(institucionId?: number) {
    return this.repo.find({ where: institucionId ? { institucionId } : {} });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Nivel académico no encontrado');
    return entity;
  }

  create(dto: CreateNivelAcademicoDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateNivelAcademicoDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

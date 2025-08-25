import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Foro } from '../../entities/foro.entity';
import { CreateForoDto, UpdateForoDto } from '../../application/dtos';

@Injectable()
export class ForoDAO {
  constructor(
    @InjectRepository(Foro)
    private readonly repository: Repository<Foro>,
  ) {}

  findAll(institucionId?: number) {
    const where: any = {};
    if (institucionId) where.institucionId = institucionId;
    return this.repository.find({ where, relations: ['autor'] });
  }

  async findOne(id: number) {
    const foro = await this.repository.findOne({ where: { id }, relations: ['autor', 'comentarios'] });
    if (!foro) throw new NotFoundException('Foro no encontrado');
    return foro;
  }

  create(dto: CreateForoDto) {
    const entity = this.repository.create(dto);
    return this.repository.save(entity);
  }

  async update(id: number, dto: UpdateForoDto) {
    // findOne already checks for existence
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

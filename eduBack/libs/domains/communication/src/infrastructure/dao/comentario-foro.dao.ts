import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComentarioForo } from '../../entities/comentario-foro.entity';
import { CreateComentarioForoDto, UpdateComentarioForoDto } from '../../application/dtos';

@Injectable()
export class ComentarioForoDAO {
  constructor(
    @InjectRepository(ComentarioForo)
    private readonly repository: Repository<ComentarioForo>,
  ) {}

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const comentario = await this.repository.findOne({ where: { id } });
    if (!comentario) throw new NotFoundException('Comentario no encontrado');
    return comentario;
  }

  create(dto: CreateComentarioForoDto) {
    const entity = this.repository.create(dto);
    return this.repository.save(entity);
  }

  async update(id: number, dto: UpdateComentarioForoDto) {
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

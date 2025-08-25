import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversacion } from '../../entities/conversacion.entity';
import { CreateConversacionDto, UpdateConversacionDto } from '../../application/dtos';

@Injectable()
export class ConversacionDAO {
  constructor(
    @InjectRepository(Conversacion)
    private readonly repository: Repository<Conversacion>,
  ) {}

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const conversacion = await this.repository.findOne({ where: { id } });
    if (!conversacion) throw new NotFoundException('Conversacion no encontrada');
    return conversacion;
  }

  create(dto: CreateConversacionDto) {
    const entity = this.repository.create(dto);
    return this.repository.save(entity);
  }

  async update(id: number, dto: UpdateConversacionDto) {
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

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensaje } from '../../entities/mensaje.entity';
import { CreateMensajeDto, UpdateMensajeDto } from '../../application/dtos';

@Injectable()
export class MensajeDAO {
  constructor(
    @InjectRepository(Mensaje)
    private readonly repository: Repository<Mensaje>,
  ) {}

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const mensaje = await this.repository.findOne({ where: { id } });
    if (!mensaje) throw new NotFoundException('Mensaje no encontrado');
    return mensaje;
  }

  create(dto: CreateMensajeDto) {
    const entity = this.repository.create(dto);
    return this.repository.save(entity);
  }

  async update(id: number, dto: UpdateMensajeDto) {
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

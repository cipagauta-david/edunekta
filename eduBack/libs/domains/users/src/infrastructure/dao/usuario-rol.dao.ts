import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioRol } from '../../entities/usuario-rol.entity';

@Injectable()
export class UsuarioRolDao {
  constructor(
    @InjectRepository(UsuarioRol)
    private readonly repository: Repository<UsuarioRol>,
  ) {}

  create(dto: Record<string, any>): Promise<UsuarioRol> {
    const entity = this.repository.create(dto);
    return this.repository.save(entity);
  }

  findAll(): Promise<UsuarioRol[]> {
    return this.repository.find();
  }

  async findOne(usuarioId: number, rolId: number): Promise<UsuarioRol> {
    const entity = await this.repository.findOne({ where: { usuarioId, rolId } });
    if (!entity) throw new NotFoundException('UsuarioRol not found');
    return entity;
  }

  async update(usuarioId: number, rolId: number, dto: Record<string, any>): Promise<UsuarioRol> {
    const entity = await this.findOne(usuarioId, rolId);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(usuarioId: number, rolId: number): Promise<UsuarioRol> {
    const entity = await this.findOne(usuarioId, rolId);
    await this.repository.remove(entity);
    return entity;
  }
}

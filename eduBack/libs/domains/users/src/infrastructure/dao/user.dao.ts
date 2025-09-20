import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, IsNull, Repository } from 'typeorm';
import { Usuario } from '../../entities/usuario.entity';

@Injectable()
export class UsuarioDao {
  constructor(
    @InjectRepository(Usuario)
    private readonly repository: Repository<Usuario>,
  ) {}

  create(dto: any, institucionId?: number): Promise<Usuario> {
    const [entity] = this.repository.create(dto);
    entity.institucionId = institucionId ?? null;
    return this.repository.save(entity);
  }

  findAll(institucionId?: number): Promise<Usuario[]> {
    return this.repository.find({
      where: { institucionId: institucionId ?? IsNull() },
    });
  }

  async findOne(id: number, institucionId?: number): Promise<Usuario> {
    const where = { id, institucionId };
    if (institucionId === undefined) {
      where.institucionId = null;
    } else {
      where.institucionId = institucionId;
    }
    const user = await this.repository.findOne({ where });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(
    email: string,
    institucionId?: number,
  ): Promise<Usuario | null> {
    const where: any = { email };
    if (institucionId === undefined) {
      where.institucionId = IsNull();
    } else {
      where.institucionId = institucionId;
    }
    return this.repository.findOne({ where });
  }

  async update(id: number, dto: any, institucionId?: number): Promise<Usuario> {
    const entity = await this.findOne(id, institucionId);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(id: number, institucionId?: number): Promise<Usuario> {
    const entity = await this.findOne(id, institucionId);
    await this.repository.remove(entity);
    return entity;
  }
}

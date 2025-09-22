import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from '../../entities/rol.entity';

@Injectable()
export class RolDao {
  constructor(
    @InjectRepository(Rol)
    private readonly repository: Repository<Rol>,
  ) {}

  create(dto: Record<string, any>): Promise<Rol> {
    const entity = this.repository.create(dto);
    return this.repository.save(entity);
  }

  findAll(): Promise<Rol[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Rol> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Rol not found');
    return entity;
  }

  async update(id: number, dto: Record<string, any>): Promise<Rol> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(id: number): Promise<Rol> {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
    return entity;
  }
}

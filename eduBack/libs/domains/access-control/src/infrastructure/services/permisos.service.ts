import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permiso } from '../../entities/permiso.entity';

@Injectable()
export class PermisosService {
  constructor(
    @InjectRepository(Permiso) private readonly repo: Repository<Permiso>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['roles'] });
  }

  async findOne(id: number) {
    const p = await this.repo.findOne({ where: { id }, relations: ['roles'] });
    if (!p) throw new NotFoundException('Permiso no encontrado');
    return p;
  }

  create(dto: Partial<Permiso>) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: Partial<Permiso>) {
    const p = await this.findOne(id);
    Object.assign(p, dto);
    return this.repo.save(p);
  }

  async remove(id: number) {
    const p = await this.findOne(id);
    await this.repo.remove(p);
  }
}

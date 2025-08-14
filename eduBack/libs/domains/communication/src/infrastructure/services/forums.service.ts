import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Foro } from '../../entities/foro.entity';

@Injectable()
export class ForumsService {
  constructor(@InjectRepository(Foro) private readonly repo: Repository<Foro>) {}

  findAll(institucionId?: number) {
    const where: any = {};
    if (institucionId) where.institucionId = institucionId;
    return this.repo.find({ where, relations: ['autor'] });
  }

  async findOne(id: number) {
    const foro = await this.repo.findOne({ where: { id }, relations: ['autor', 'comentarios'] });
    if (!foro) throw new NotFoundException('Foro no encontrado');
    return foro;
  }

  create(dto: Partial<Foro>) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: Partial<Foro>) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

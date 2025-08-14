import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from '../../entities/factura.entity';

@Injectable()
export class InvoicesService {
  constructor(@InjectRepository(Factura) private readonly repo: Repository<Factura>) {}

  findAll(institucionId?: number) {
    const where: any = {};
    if (institucionId) where.institucionId = institucionId as any; // adapt if entity differs
    return this.repo.find({ where, relations: ['detalles', 'pagos'] as any });
  }

  async findOne(id: number) {
    const factura = await this.repo.findOne({ where: { id }, relations: ['detalles', 'pagos'] as any });
    if (!factura) throw new NotFoundException('Factura no encontrada');
    return factura;
  }

  create(dto: Partial<Factura>) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: Partial<Factura>) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

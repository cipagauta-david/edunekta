import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleFactura } from '../../entities/detalle-factura.entity';
import { CreateDetalleFacturaDto } from '../dto/create-detalle-factura.dto';
import { UpdateDetalleFacturaDto } from '../dto/update-detalle-factura.dto';

@Injectable()
export class DetalleFacturaDao {
  constructor(
    @InjectRepository(DetalleFactura)
    private readonly repo: Repository<DetalleFactura>,
  ) {}

  findAll(facturaId?: number) {
    const where: any = {};
    if (facturaId) where.facturaId = facturaId;
    return this.repo.find({ where });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Detalle de factura no encontrado');
    return entity;
  }

  create(dto: CreateDetalleFacturaDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateDetalleFacturaDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

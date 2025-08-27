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
    if (!entity)
      throw new NotFoundException('Detalle de factura no encontrado');
    return entity;
  }

  create(dto: CreateDetalleFacturaDto[]) {
    // Map numeric DTO fields to string for decimal columns in the entity
    const mapped = dto.map((d) => ({
      ...d,
      cantidad: d.cantidad.toString(),
      precioUnitario: d.precioUnitario.toString(),
      monto: d.monto.toString(),
    }));
    const entities = this.repo.create(mapped);
    return this.repo.save(entities);
  }

  async update(id: number, dto: UpdateDetalleFacturaDto) {
    const entity = await this.findOne(id);
    const { cantidad, precioUnitario, monto, ...rest } = dto;
    Object.assign(entity, rest);
    if (cantidad !== undefined) entity.cantidad = cantidad.toString();
    if (precioUnitario !== undefined)
      entity.precioUnitario = precioUnitario.toString();
    if (monto !== undefined) entity.monto = monto.toString();
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

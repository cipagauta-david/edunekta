import { Injectable } from '@nestjs/common';
import { DetalleFacturaDao } from '../daos/detalle-factura.dao';
import { CreateDetalleFacturaDto } from '../dto/create-detalle-factura.dto';
import { UpdateDetalleFacturaDto } from '../dto/update-detalle-factura.dto';

@Injectable()
export class DetalleFacturaService {
  constructor(private readonly dao: DetalleFacturaDao) {}

  findAll(facturaId?: number) {
    return this.dao.findAll(facturaId);
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  create(dto: CreateDetalleFacturaDto) {
    return this.dao.create(dto);
  }

  update(id: number, dto: UpdateDetalleFacturaDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

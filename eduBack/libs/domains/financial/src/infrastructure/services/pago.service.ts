import { Injectable } from '@nestjs/common';
import { PagoDao } from '../daos/pago.dao';
import { CreatePagoDto } from '../dto/create-pago.dto';
import { UpdatePagoDto } from '../dto/update-pago.dto';

@Injectable()
export class PagoService {
  constructor(private readonly dao: PagoDao) {}

  findAll(facturaId?: number) {
    return this.dao.findAll(facturaId);
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  create(dto: CreatePagoDto) {
    return this.dao.create(dto);
  }

  update(id: number, dto: UpdatePagoDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

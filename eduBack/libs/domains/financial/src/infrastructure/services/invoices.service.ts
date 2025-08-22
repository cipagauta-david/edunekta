import { Injectable } from '@nestjs/common';
import { FacturaDao } from '../daos/factura.dao';
import { CreateFacturaDto } from '../dto/create-factura.dto';
import { UpdateFacturaDto } from '../dto/update-factura.dto';

@Injectable()
export class InvoicesService {
  constructor(private readonly dao: FacturaDao) {}

  findAll(institucionId?: number) {
    // Here you could add business logic before or after calling the dao
    return this.dao.findAll(institucionId);
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  create(dto: CreateFacturaDto) {
    return this.dao.create(dto);
  }

  update(id: number, dto: UpdateFacturaDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

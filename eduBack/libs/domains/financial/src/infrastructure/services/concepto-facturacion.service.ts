import { Injectable } from '@nestjs/common';
import { ConceptoFacturacionDao } from '../daos/concepto-facturacion.dao';
import { CreateConceptoFacturacionDto } from '../dto/create-concepto-facturacion.dto';
import { UpdateConceptoFacturacionDto } from '../dto/update-concepto-facturacion.dto';

@Injectable()
export class ConceptoFacturacionService {
  constructor(private readonly dao: ConceptoFacturacionDao) {}

  findAll(institucionId?: number) {
    return this.dao.findAll(institucionId);
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  create(dto: CreateConceptoFacturacionDto) {
    return this.dao.create(dto);
  }

  update(id: number, dto: UpdateConceptoFacturacionDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

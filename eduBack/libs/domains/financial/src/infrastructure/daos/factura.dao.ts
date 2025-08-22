import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from '../../entities/factura.entity';
import { CreateFacturaDto } from '../dto/create-factura.dto';
import { UpdateFacturaDto } from '../dto/update-factura.dto';

@Injectable()
export class FacturaDao {
  constructor(
    @InjectRepository(Factura)
    private readonly repo: Repository<Factura>,
  ) {}

  findAll(institucionId?: number) {
    const where: any = {};
    if (institucionId) where.institucionId = institucionId;
    return this.repo.find({ where, relations: ['detalles', 'pagos'] });
  }

  async findOne(id: number) {
    const factura = await this.repo.findOne({ where: { id }, relations: ['detalles', 'pagos'] });
    if (!factura) throw new NotFoundException('Factura no encontrada');
    return factura;
  }

  create(dto: CreateFacturaDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateFacturaDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

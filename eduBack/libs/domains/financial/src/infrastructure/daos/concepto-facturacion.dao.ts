import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConceptoFacturacion } from '../../entities/concepto-facturacion.entity';
import { CreateConceptoFacturacionDto } from '../dto/create-concepto-facturacion.dto';
import { UpdateConceptoFacturacionDto } from '../dto/update-concepto-facturacion.dto';

@Injectable()
export class ConceptoFacturacionDao {
  constructor(
    @InjectRepository(ConceptoFacturacion)
    private readonly repo: Repository<ConceptoFacturacion>,
  ) {}

  findAll(institucionId?: number) {
    const where: any = {};
    if (institucionId) where.institucionId = institucionId;
    return this.repo.find({ where });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Concepto de facturación no encontrado');
    return entity;
  }

  create(dto: CreateConceptoFacturacionDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateConceptoFacturacionDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from '../../entities/pago.entity';
import { CreatePagoDto } from '../dto/create-pago.dto';
import { UpdatePagoDto } from '../dto/update-pago.dto';

@Injectable()
export class PagoDao {
  constructor(
    @InjectRepository(Pago)
    private readonly repo: Repository<Pago>,
  ) {}

  findAll(facturaId?: number) {
    const where: any = {};
    if (facturaId) where.facturaId = facturaId;
    return this.repo.find({ where });
  }

  async findOne(id: number) {
    const entity = await this.repo.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Pago no encontrado');
    return entity;
  }

  create(dto: CreatePagoDto) {
    const entity = this.repo.create({
      ...dto,
      monto: dto.monto.toString(),
    });
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdatePagoDto) {
    const entity = await this.findOne(id);
    const { monto, ...rest } = dto;
    Object.assign(entity, rest);
    if (monto !== undefined) entity.monto = monto.toString();
    return this.repo.save(entity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    await this.repo.remove(entity);
  }
}

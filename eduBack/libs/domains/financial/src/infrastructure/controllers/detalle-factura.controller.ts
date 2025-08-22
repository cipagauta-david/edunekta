import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, Delete, Query } from '@nestjs/common';
import { DetalleFacturaService } from '../services/detalle-factura.service';
import { CreateDetalleFacturaDto } from '../dto/create-detalle-factura.dto';
import { UpdateDetalleFacturaDto } from '../dto/update-detalle-factura.dto';

@Controller('detalles-factura')
export class DetalleFacturaController {
  constructor(private readonly service: DetalleFacturaService) {}

  @Get()
  findAll(@Query('facturaId') facturaId?: string) {
    return this.service.findAll(facturaId ? Number(facturaId) : undefined);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDetalleFacturaDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDetalleFacturaDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}

import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, Delete, Query } from '@nestjs/common';
import { ConceptoFacturacionService } from '../services/concepto-facturacion.service';
import { CreateConceptoFacturacionDto } from '../dto/create-concepto-facturacion.dto';
import { UpdateConceptoFacturacionDto } from '../dto/update-concepto-facturacion.dto';

@Controller('conceptos-facturacion')
export class ConceptoFacturacionController {
  constructor(private readonly service: ConceptoFacturacionService) {}

  @Get()
  findAll(@Query('institucionId') institucionId?: string) {
    return this.service.findAll(institucionId ? Number(institucionId) : undefined);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateConceptoFacturacionDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateConceptoFacturacionDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}

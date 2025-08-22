import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, Delete, Query } from '@nestjs/common';
import { TermGradesService } from '../services/term-grades.service';
import { CreateCalificacionPeriodoDto } from '../dto/create-calificacion-periodo.dto';
import { UpdateCalificacionPeriodoDto } from '../dto/update-calificacion-periodo.dto';

@Controller('term-grades')
export class TermGradesController {
  constructor(private readonly service: TermGradesService) {}

  @Get()
  findAll(@Query('institucionId') institucionId?: string) {
    return this.service.findAll(institucionId ? Number(institucionId) : undefined);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateCalificacionPeriodoDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCalificacionPeriodoDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}

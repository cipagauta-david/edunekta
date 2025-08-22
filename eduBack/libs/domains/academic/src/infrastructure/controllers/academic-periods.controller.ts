import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, Delete, Query } from '@nestjs/common';
import { AcademicPeriodsService } from '../services/academic-periods.service';
import { CreatePeriodoAcademicoDto } from '../dto/create-periodo-academico.dto';
import { UpdatePeriodoAcademicoDto } from '../dto/update-periodo-academico.dto';

@Controller('academic-periods')
export class AcademicPeriodsController {
  constructor(private readonly service: AcademicPeriodsService) {}

  @Get()
  findAll(@Query('institucionId') institucionId?: string) {
    return this.service.findAll(institucionId ? Number(institucionId) : undefined);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreatePeriodoAcademicoDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePeriodoAcademicoDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}

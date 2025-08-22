import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, Delete, Query } from '@nestjs/common';
import { ActivityEvidencesService } from '../services/activity-evidences.service';
import { CreateEvidenciaActividadDto } from '../dto/create-evidencia-actividad.dto';
import { UpdateEvidenciaActividadDto } from '../dto/update-evidencia-actividad.dto';

@Controller('activity-evidences')
export class ActivityEvidencesController {
  constructor(private readonly service: ActivityEvidencesService) {}

  @Get()
  findAll(@Query('institucionId') institucionId?: string) {
    return this.service.findAll(institucionId ? Number(institucionId) : undefined);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateEvidenciaActividadDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEvidenciaActividadDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}

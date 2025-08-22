import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, Delete, Query } from '@nestjs/common';
import { EvaluationWeightsService } from '../services/evaluation-weights.service';
import { CreatePonderacionEvaluacionDto } from '../dto/create-ponderacion-evaluacion.dto';
import { UpdatePonderacionEvaluacionDto } from '../dto/update-ponderacion-evaluacion.dto';

@Controller('evaluation-weights')
export class EvaluationWeightsController {
  constructor(private readonly service: EvaluationWeightsService) {}

  @Get()
  findAll(@Query('institucionId') institucionId?: string) {
    return this.service.findAll(institucionId ? Number(institucionId) : undefined);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreatePonderacionEvaluacionDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePonderacionEvaluacionDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}

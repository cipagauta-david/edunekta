import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, Delete, Query } from '@nestjs/common';
import { GradesService } from '../services/grades.service';
import { CreateGradoDto } from '../dto/create-grado.dto';
import { UpdateGradoDto } from '../dto/update-grado.dto';

@Controller('grades')
export class GradesController {
  constructor(private readonly service: GradesService) {}

  @Get()
  findAll(@Query('institucionId') institucionId?: string) {
    return this.service.findAll(institucionId ? Number(institucionId) : undefined);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateGradoDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGradoDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}

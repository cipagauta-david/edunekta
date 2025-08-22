import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, Delete, Query } from '@nestjs/common';
import { AcademicLevelsService } from '../services/academic-levels.service';
import { CreateNivelAcademicoDto } from '../dto/create-nivel-academico.dto';
import { UpdateNivelAcademicoDto } from '../dto/update-nivel-academico.dto';

@Controller('academic-levels')
export class AcademicLevelsController {
  constructor(private readonly service: AcademicLevelsService) {}

  @Get()
  findAll(@Query('institucionId') institucionId?: string) {
    return this.service.findAll(institucionId ? Number(institucionId) : undefined);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateNivelAcademicoDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateNivelAcademicoDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}

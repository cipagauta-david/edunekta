import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, Delete, Query } from '@nestjs/common';
import { ClassroomsService } from '../services/classrooms.service';
import { CreateAulaDto } from '../dto/create-aula.dto';
import { UpdateAulaDto } from '../dto/update-aula.dto';

@Controller('classrooms')
export class ClassroomsController {
  constructor(private readonly service: ClassroomsService) {}

  @Get()
  findAll(@Query('institucionId') institucionId?: string) {
    return this.service.findAll(institucionId ? Number(institucionId) : undefined);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateAulaDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAulaDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}

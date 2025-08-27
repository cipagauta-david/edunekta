import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  CreateEstudianteAcudienteDto,
  UpdateEstudianteAcudienteDto,
} from '../../dto';
import { EstudianteAcudienteService } from '../services/estudiante-acudiente.service';

@Controller('estudiante-acudiente')
export class EstudianteAcudienteController {
  constructor(private readonly service: EstudianteAcudienteService) {}

  @Post()
  create(@Body() dto: CreateEstudianteAcudienteDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEstudianteAcudienteDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  AcademicService,
  CreateActividadDto,
  CreateAsignaturaDto,
} from './academic.service';

@Controller('academic')
export class AcademicController {
  constructor(private readonly academicService: AcademicService) {}

  // Actividades endpoints
  @Get('actividades')
  async findAllActividades(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('asignatura_id') asignatura_id?: string,
    @Query('grupo_id') grupo_id?: string,
    @Query('periodo_id') periodo_id?: string,
    @Query('search') search?: string,
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;

    const filters = {
      asignatura_id: asignatura_id ? parseInt(asignatura_id, 10) : undefined,
      grupo_id: grupo_id ? parseInt(grupo_id, 10) : undefined,
      periodo_id: periodo_id ? parseInt(periodo_id, 10) : undefined,
      search,
    };

    return this.academicService.findAllActividades(pageNum, limitNum, filters);
  }

  @Get('actividades/:id')
  async findOneActividad(@Param('id', ParseIntPipe) id: number) {
    return this.academicService.findOneActividad(id);
  }

  @Post('actividades')
  @HttpCode(HttpStatus.CREATED)
  async createActividad(@Body() createActividadDto: CreateActividadDto) {
    return this.academicService.createActividad(createActividadDto);
  }

  @Patch('actividades/:id')
  async updateActividad(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<CreateActividadDto>,
  ) {
    return this.academicService.updateActividad(id, updateData);
  }

  @Delete('actividades/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeActividad(@Param('id', ParseIntPipe) id: number) {
    return this.academicService.removeActividad(id);
  }

  // Asignaturas endpoints
  @Get('asignaturas')
  async findAllAsignaturas(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search?: string,
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;

    return this.academicService.findAllAsignaturas(pageNum, limitNum, search);
  }

  @Get('asignaturas/:id')
  async findOneAsignatura(@Param('id', ParseIntPipe) id: number) {
    return this.academicService.findOneAsignatura(id);
  }

  @Post('asignaturas')
  @HttpCode(HttpStatus.CREATED)
  async createAsignatura(@Body() createAsignaturaDto: CreateAsignaturaDto) {
    return this.academicService.createAsignatura(createAsignaturaDto);
  }

  @Patch('asignaturas/:id')
  async updateAsignatura(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<CreateAsignaturaDto>,
  ) {
    return this.academicService.updateAsignatura(id, updateData);
  }

  @Delete('asignaturas/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAsignatura(@Param('id', ParseIntPipe) id: number) {
    return this.academicService.removeAsignatura(id);
  }

  @Get('stats')
  async getStats() {
    return this.academicService.getAcademicStats();
  }
}

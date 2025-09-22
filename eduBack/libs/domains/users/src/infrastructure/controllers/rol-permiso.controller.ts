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
import { RolPermisoService } from '../services/rol-permiso.service';
import { CreateRolPermisoDto, UpdateRolPermisoDto } from '../../dto';

@Controller('rol-permisos')
export class RolPermisoController {
  constructor(private readonly service: RolPermisoService) {}

  @Post()
  create(@Body() dto: CreateRolPermisoDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':rolId/:permisoId')
  findOne(
    @Param('rolId', ParseIntPipe) rolId: number,
    @Param('permisoId', ParseIntPipe) permisoId: number,
  ) {
    return this.service.findOne(rolId, permisoId);
  }

  @Patch(':rolId/:permisoId')
  update(
    @Param('rolId', ParseIntPipe) rolId: number,
    @Param('permisoId', ParseIntPipe) permisoId: number,
    @Body() dto: UpdateRolPermisoDto,
  ) {
    return this.service.update(rolId, permisoId, dto);
  }

  @Delete(':rolId/:permisoId')
  remove(
    @Param('rolId', ParseIntPipe) rolId: number,
    @Param('permisoId', ParseIntPipe) permisoId: number,
  ) {
    return this.service.remove(rolId, permisoId);
  }
}

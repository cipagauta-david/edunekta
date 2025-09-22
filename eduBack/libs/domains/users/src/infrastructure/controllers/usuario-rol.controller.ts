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
import { UsuarioRolService } from '../services/usuario-rol.service';
import { CreateUsuarioRolDto, UpdateUsuarioRolDto } from '../../dto';

@Controller('usuario-roles')
export class UsuarioRolController {
  constructor(private readonly service: UsuarioRolService) {}

  @Post()
  create(@Body() dto: CreateUsuarioRolDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':usuarioId/:rolId')
  findOne(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
    @Param('rolId', ParseIntPipe) rolId: number,
  ) {
    return this.service.findOne(usuarioId, rolId);
  }

  @Patch(':usuarioId/:rolId')
  update(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
    @Param('rolId', ParseIntPipe) rolId: number,
    @Body() dto: UpdateUsuarioRolDto,
  ) {
    return this.service.update(usuarioId, rolId, dto);
  }

  @Delete(':usuarioId/:rolId')
  remove(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
    @Param('rolId', ParseIntPipe) rolId: number,
  ) {
    return this.service.remove(usuarioId, rolId);
  }
}

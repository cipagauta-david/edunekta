import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SubjectsService } from '../services/subjects.service';
import { CreateSubjectDto, UpdateSubjectDto, SubjectQueryDto } from '../dto/subject.dto';
import { JwtAuthGuard } from '../../../../core/auth/jwt-auth.guard';
import { RolesGuard } from '../../../../common/guards/roles.guard';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';

/**
 * Controlador para gestión de asignaturas
 */
@Controller('api/v1/academic/subjects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  /**
   * Crear nueva asignatura
   */
  @Post()
  @Roles('admin', 'teacher')
  create(@Body() createSubjectDto: CreateSubjectDto, @CurrentUser() user: any) {
    return this.subjectsService.create(createSubjectDto, user.id);
  }

  /**
   * Obtener todas las asignaturas con filtros
   */
  @Get()
  @Roles('admin', 'teacher', 'student')
  findAll(@Query() query: SubjectQueryDto) {
    return this.subjectsService.findAll(query);
  }

  /**
   * Obtener asignatura por ID
   */
  @Get(':id')
  @Roles('admin', 'teacher', 'student')
  findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(+id);
  }

  /**
   * Actualizar asignatura
   */
  @Patch(':id')
  @Roles('admin', 'teacher')
  update(
    @Param('id') id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
    @CurrentUser() user: any,
  ) {
    return this.subjectsService.update(+id, updateSubjectDto, user.id);
  }

  /**
   * Eliminar asignatura
   */
  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.subjectsService.remove(+id, user.id);
  }

  /**
   * Obtener estudiantes inscritos en una asignatura
   */
  @Get(':id/students')
  @Roles('admin', 'teacher')
  getEnrolledStudents(@Param('id') id: string) {
    return this.subjectsService.getEnrolledStudents(+id);
  }

  /**
   * Inscribir estudiante en asignatura
   */
  @Post(':id/enroll/:studentId')
  @Roles('admin', 'teacher')
  enrollStudent(
    @Param('id') id: string,
    @Param('studentId') studentId: string,
    @CurrentUser() user: any,
  ) {
    return this.subjectsService.enrollStudent(+id, +studentId, user.id);
  }
}


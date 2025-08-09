import { IsString, IsOptional, IsNumber, IsBoolean, MinLength, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../../../common/dto/pagination.dto';

/**
 * DTO para crear asignatura
 */
export class CreateSubjectDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  descripcion?: string;

  @IsNumber()
  grado: number;

  @IsOptional()
  @IsNumber()
  intensidad_horaria?: number;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  codigo?: string;

  @IsOptional()
  @IsBoolean()
  estado?: boolean = true;

  @IsOptional()
  @IsNumber()
  creditos?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  area?: string;
}

/**
 * DTO para actualizar asignatura
 */
export class UpdateSubjectDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  nombre?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  grado?: number;

  @IsOptional()
  @IsNumber()
  intensidad_horaria?: number;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  codigo?: string;

  @IsOptional()
  @IsBoolean()
  estado?: boolean;

  @IsOptional()
  @IsNumber()
  creditos?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  area?: string;
}

/**
 * DTO para consultas de asignaturas
 */
export class SubjectQueryDto extends PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  grado?: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  estado?: boolean;

  @IsOptional()
  @IsString()
  area?: string;

  @IsOptional()
  @IsString()
  codigo?: string;
}

/**
 * DTO de respuesta para asignatura
 */
export class SubjectResponseDto {
  id: number;
  nombre: string;
  descripcion?: string;
  grado: number;
  intensidad_horaria?: number;
  codigo?: string;
  estado: boolean;
  creditos?: number;
  area?: string;
  created_at: Date;
  updated_at: Date;

  // Relaciones
  actividades?: any[];
  matriculas?: any[];
  calificaciones?: any[];
}

/**
 * DTO para inscripción de estudiante
 */
export class EnrollStudentDto {
  @IsNumber()
  studentId: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

/**
 * DTO para estadísticas de asignatura
 */
export class SubjectStatsDto {
  totalStudents: number;
  totalActivities: number;
  averageGrade: number;
  attendanceRate: number;
  completionRate: number;
}


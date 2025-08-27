import { IsNumber, IsEnum, IsOptional } from 'class-validator';

export class UpdatePonderacionEvaluacionDto {
  @IsNumber()
  @IsOptional()
  institucionId?: number;

  @IsNumber()
  @IsOptional()
  claseId?: number;

  @IsEnum(['TAREA', 'EXAMEN', 'PROYECTO', 'PARTICIPACION'])
  @IsOptional()
  categoria?: 'TAREA' | 'EXAMEN' | 'PROYECTO' | 'PARTICIPACION';

  @IsNumber()
  @IsOptional()
  porcentaje?: number;
}

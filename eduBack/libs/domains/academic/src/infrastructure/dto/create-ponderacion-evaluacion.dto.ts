import { IsNumber, IsEnum, IsNotEmpty } from 'class-validator';

export class CreatePonderacionEvaluacionDto {
  @IsNumber()
  @IsNotEmpty()
  institucionId: number;

  @IsNumber()
  @IsNotEmpty()
  claseId: number;

  @IsEnum(['TAREA', 'EXAMEN', 'PROYECTO', 'PARTICIPACION'])
  @IsNotEmpty()
  categoria: 'TAREA' | 'EXAMEN' | 'PROYECTO' | 'PARTICIPACION';

  @IsNumber()
  @IsNotEmpty()
  porcentaje: number;
}

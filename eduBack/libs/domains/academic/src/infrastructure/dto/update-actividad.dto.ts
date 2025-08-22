import { IsString, IsNumber, IsEnum, IsDate, IsOptional } from 'class-validator';

export class UpdateActividadDto {
  @IsNumber()
  @IsOptional()
  institucionId?: number;

  @IsString()
  @IsOptional()
  titulo?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsDate()
  @IsOptional()
  fechaEntrega?: Date;

  @IsNumber()
  @IsOptional()
  claseId?: number;

  @IsEnum(['PUBLICADA', 'CERRADA', 'CALIFICADA'])
  @IsOptional()
  estado?: 'PUBLICADA' | 'CERRADA' | 'CALIFICADA';

  @IsEnum(['TAREA', 'EXAMEN', 'PROYECTO', 'PARTICIPACION'])
  @IsOptional()
  categoria?: 'TAREA' | 'EXAMEN' | 'PROYECTO' | 'PARTICIPACION';
}

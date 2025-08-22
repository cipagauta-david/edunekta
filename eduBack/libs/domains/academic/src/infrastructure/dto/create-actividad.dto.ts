import { IsString, IsNumber, IsEnum, IsDate, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateActividadDto {
  @IsNumber()
  @IsNotEmpty()
  institucionId: number;

  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsDate()
  @IsOptional()
  fechaEntrega?: Date;

  @IsNumber()
  @IsNotEmpty()
  claseId: number;

  @IsEnum(['PUBLICADA', 'CERRADA', 'CALIFICADA'])
  @IsOptional()
  estado?: 'PUBLICADA' | 'CERRADA' | 'CALIFICADA';

  @IsEnum(['TAREA', 'EXAMEN', 'PROYECTO', 'PARTICIPACION'])
  @IsNotEmpty()
  categoria: 'TAREA' | 'EXAMEN' | 'PROYECTO' | 'PARTICIPACION';
}

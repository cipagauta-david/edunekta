import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateEvidenciaActividadDto {
  @IsNumber()
  @IsOptional()
  institucionId?: number;

  @IsNumber()
  @IsOptional()
  actividadId?: number;

  @IsNumber()
  @IsOptional()
  estudianteId?: number;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @IsOptional()
  calificacion?: number;
}

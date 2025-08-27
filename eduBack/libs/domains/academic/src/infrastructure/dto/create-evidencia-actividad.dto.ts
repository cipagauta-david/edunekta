import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateEvidenciaActividadDto {
  @IsNumber()
  @IsNotEmpty()
  institucionId: number;

  @IsNumber()
  @IsNotEmpty()
  actividadId: number;

  @IsNumber()
  @IsNotEmpty()
  estudianteId: number;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @IsOptional()
  calificacion?: number;
}

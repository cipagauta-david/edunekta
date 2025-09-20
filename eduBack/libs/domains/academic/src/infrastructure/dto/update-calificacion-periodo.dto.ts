import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateCalificacionPeriodoDto {
  @IsNumber()
  @IsOptional()
  institucionId?: number;

  @IsNumber()
  @IsOptional()
  estudianteId?: number;

  @IsNumber()
  @IsOptional()
  asignaturaId?: number;

  @IsNumber()
  @IsOptional()
  periodoAcademicoId?: number;

  @IsNumber()
  @IsOptional()
  notaFinal?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}

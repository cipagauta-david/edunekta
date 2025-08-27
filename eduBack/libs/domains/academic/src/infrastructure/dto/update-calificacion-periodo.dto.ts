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
  notaFinal?: number;

  @IsString()
  @IsOptional()
  observaciones?: string;
}

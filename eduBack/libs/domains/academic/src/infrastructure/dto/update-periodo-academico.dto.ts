import { IsString, IsNumber, IsEnum, IsDateString, IsOptional } from 'class-validator';

export class UpdatePeriodoAcademicoDto {
  @IsNumber()
  @IsOptional()
  institucionId?: number;

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsEnum(['PLANIFICADO', 'EN_CURSO', 'FINALIZADO', 'ARCHIVADO'])
  @IsOptional()
  estado?: 'PLANIFICADO' | 'EN_CURSO' | 'FINALIZADO' | 'ARCHIVADO';

  @IsDateString()
  @IsOptional()
  fechaInicio?: string;

  @IsDateString()
  @IsOptional()
  fechaFin?: string;
}

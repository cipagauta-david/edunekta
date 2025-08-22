import { IsString, IsNumber, IsEnum, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePeriodoAcademicoDto {
  @IsNumber()
  @IsNotEmpty()
  institucionId: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEnum(['PLANIFICADO', 'EN_CURSO', 'FINALIZADO', 'ARCHIVADO'])
  @IsOptional()
  estado?: 'PLANIFICADO' | 'EN_CURSO' | 'FINALIZADO' | 'ARCHIVADO';

  @IsDateString()
  @IsNotEmpty()
  fechaInicio: string;

  @IsDateString()
  @IsNotEmpty()
  fechaFin: string;
}

import { IsString, IsNumber, IsEnum, IsDateString, IsOptional } from 'class-validator';

export class UpdateMatriculaDto {
  @IsNumber()
  @IsOptional()
  institucionId?: number;

  @IsNumber()
  @IsOptional()
  estudianteId?: number;

  @IsNumber()
  @IsOptional()
  gradoId?: number;

  @IsNumber()
  @IsOptional()
  grupoId?: number;

  @IsNumber()
  @IsOptional()
  periodoAcademicoId?: number;

  @IsEnum(['ACTIVA', 'RETIRADO', 'FINALIZADA', 'PENDIENTE'])
  @IsOptional()
  estado?: 'ACTIVA' | 'RETIRADO' | 'FINALIZADA' | 'PENDIENTE';

  @IsDateString()
  @IsOptional()
  fechaMatricula?: string;
}

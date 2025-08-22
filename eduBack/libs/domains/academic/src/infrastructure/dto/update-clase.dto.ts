import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';

export class UpdateClaseDto {
  @IsNumber()
  @IsOptional()
  institucionId?: number;

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsEnum(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'])
  @IsOptional()
  dia?: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado';

  @IsString()
  @IsOptional()
  horaInicio?: string;

  @IsString()
  @IsOptional()
  horaFin?: string;

  @IsNumber()
  @IsOptional()
  grupoId?: number;

  @IsNumber()
  @IsOptional()
  periodoAcademicoId?: number;

  @IsNumber()
  @IsOptional()
  aulaId?: number;

  @IsNumber()
  @IsOptional()
  asignaturaId?: number;

  @IsNumber()
  @IsOptional()
  profesorId?: number;
}

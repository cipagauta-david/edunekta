import { IsString, IsNumber, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateClaseDto {
  @IsNumber()
  @IsNotEmpty()
  institucionId: number;

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsEnum(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'])
  @IsNotEmpty()
  dia: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado';

  @IsString()
  @IsNotEmpty()
  horaInicio: string;

  @IsString()
  @IsNotEmpty()
  horaFin: string;

  @IsNumber()
  @IsNotEmpty()
  grupoId: number;

  @IsNumber()
  @IsNotEmpty()
  periodoAcademicoId: number;

  @IsNumber()
  @IsNotEmpty()
  aulaId: number;

  @IsNumber()
  @IsNotEmpty()
  asignaturaId: number;

  @IsNumber()
  @IsNotEmpty()
  profesorId: number;
}

import { IsString, IsNumber, IsEnum, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMatriculaDto {
  @IsNumber()
  @IsNotEmpty()
  institucionId: number;

  @IsNumber()
  @IsNotEmpty()
  estudianteId: number;

  @IsNumber()
  @IsNotEmpty()
  gradoId: number;

  @IsNumber()
  @IsNotEmpty()
  grupoId: number;

  @IsNumber()
  @IsNotEmpty()
  periodoAcademicoId: number;

  @IsEnum(['ACTIVA', 'RETIRADO', 'FINALIZADA', 'PENDIENTE'])
  @IsOptional()
  estado?: 'ACTIVA' | 'RETIRADO' | 'FINALIZADA' | 'PENDIENTE';

  @IsDateString()
  @IsNotEmpty()
  fechaMatricula: string;
}

import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCalificacionPeriodoDto {
  @IsNumber()
  @IsNotEmpty()
  institucionId: number;

  @IsNumber()
  @IsNotEmpty()
  estudianteId: number;

  @IsNumber()
  @IsNotEmpty()
  asignaturaId: number;

  @IsNumber()
  @IsNotEmpty()
  periodoAcademicoId: number;

  @IsNumber()
  @IsNotEmpty()
  notaFinal: number;

  @IsString()
  @IsOptional()
  observaciones?: string;
}

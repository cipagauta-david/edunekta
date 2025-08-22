import { IsString, IsNumber, IsEnum, IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAsistenciaDto {
  @IsNumber()
  @IsNotEmpty()
  institucionId: number;

  @IsNumber()
  @IsNotEmpty()
  claseId: number;

  @IsNumber()
  @IsNotEmpty()
  estudianteId: number;

  @IsDateString()
  @IsNotEmpty()
  fecha: string;

  @IsEnum(['PRESENTE', 'AUSENTE', 'TARDE', 'JUSTIFICADA'])
  @IsNotEmpty()
  estado: 'PRESENTE' | 'AUSENTE' | 'TARDE' | 'JUSTIFICADA';

  @IsString()
  @IsOptional()
  observacion?: string;
}

import { IsString, IsNumber, IsEnum, IsDateString, IsOptional } from 'class-validator';

export class UpdateAsistenciaDto {
  @IsNumber()
  @IsOptional()
  institucionId?: number;

  @IsNumber()
  @IsOptional()
  claseId?: number;

  @IsNumber()
  @IsOptional()
  estudianteId?: number;

  @IsDateString()
  @IsOptional()
  fecha?: string;

  @IsEnum(['PRESENTE', 'AUSENTE', 'TARDE', 'JUSTIFICADA'])
  @IsOptional()
  estado?: 'PRESENTE' | 'AUSENTE' | 'TARDE' | 'JUSTIFICADA';

  @IsString()
  @IsOptional()
  observacion?: string;
}

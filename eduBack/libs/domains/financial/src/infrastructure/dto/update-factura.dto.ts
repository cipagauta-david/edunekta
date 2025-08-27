import { IsDateString, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class UpdateFacturaDto {
  @IsNumber()
  @IsOptional()
  institucionId?: number;

  @IsNumber()
  @IsOptional()
  acudienteId?: number;

  @IsDateString()
  @IsOptional()
  fechaEmision?: string;

  @IsDateString()
  @IsOptional()
  fechaVencimiento?: string;

  @IsNumber()
  @IsOptional()
  total?: number;

  @IsEnum(['PENDIENTE', 'PARCIAL', 'PAGADA', 'VENCIDA', 'ANULADA'])
  @IsOptional()
  estado?: 'PENDIENTE' | 'PARCIAL' | 'PAGADA' | 'VENCIDA' | 'ANULADA';
}

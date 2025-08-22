import { IsDateString, IsEnum, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateFacturaDto {
  @IsNumber()
  @IsNotEmpty()
  institucionId: number;

  @IsNumber()
  @IsNotEmpty()
  acudienteId: number;

  @IsDateString()
  @IsNotEmpty()
  fechaEmision: string;

  @IsDateString()
  @IsNotEmpty()
  fechaVencimiento: string;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsEnum(['PENDIENTE', 'PARCIAL', 'PAGADA', 'VENCIDA', 'ANULADA'])
  @IsNotEmpty()
  estado: 'PENDIENTE' | 'PARCIAL' | 'PAGADA' | 'VENCIDA' | 'ANULADA';
}

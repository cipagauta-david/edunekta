import { IsString, IsNumber, IsDate, IsEnum, IsOptional } from 'class-validator';

export class UpdatePagoDto {
  @IsNumber()
  @IsOptional()
  institucionId?: number;

  @IsNumber()
  @IsOptional()
  facturaId?: number;

  @IsNumber()
  @IsOptional()
  monto?: number;

  @IsDate()
  @IsOptional()
  fechaPago?: Date;

  @IsEnum(['EFECTIVO', 'TRANSFERENCIA', 'TARJETA', 'PSE'])
  @IsOptional()
  metodo?: 'EFECTIVO' | 'TRANSFERENCIA' | 'TARJETA' | 'PSE';

  @IsString()
  @IsOptional()
  referencia?: string;
}

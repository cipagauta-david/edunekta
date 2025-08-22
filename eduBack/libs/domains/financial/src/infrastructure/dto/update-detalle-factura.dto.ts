import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateDetalleFacturaDto {
  @IsNumber()
  @IsOptional()
  institucionId?: number;

  @IsNumber()
  @IsOptional()
  facturaId?: number;

  @IsNumber()
  @IsOptional()
  conceptoFacturacionId?: number;

  @IsString()
  @IsOptional()
  descripcionAdicional?: string;

  @IsNumber()
  @IsOptional()
  cantidad?: number;

  @IsNumber()
  @IsOptional()
  precioUnitario?: number;

  @IsNumber()
  @IsOptional()
  monto?: number;
}

import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateDetalleFacturaDto {
  @IsNumber()
  @IsNotEmpty()
  institucionId: number;

  @IsNumber()
  @IsNotEmpty()
  facturaId: number;

  @IsNumber()
  @IsNotEmpty()
  conceptoFacturacionId: number;

  @IsString()
  @IsOptional()
  descripcionAdicional?: string;

  @IsNumber()
  @IsNotEmpty()
  cantidad: number;

  @IsNumber()
  @IsNotEmpty()
  precioUnitario: number;

  @IsNumber()
  @IsNotEmpty()
  monto: number;
}

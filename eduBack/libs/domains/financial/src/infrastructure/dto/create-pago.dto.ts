import { IsString, IsNumber, IsDate, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';

export class CreatePagoDto {
  @IsNumber()
  @IsNotEmpty()
  institucionId: number;

  @IsNumber()
  @IsNotEmpty()
  facturaId: number;

  @IsNumber()
  @IsNotEmpty()
  monto: number;

  @IsDate()
  @IsNotEmpty()
  fechaPago: Date;

  @IsEnum(['EFECTIVO', 'TRANSFERENCIA', 'TARJETA', 'PSE'])
  @IsNotEmpty()
  metodo: 'EFECTIVO' | 'TRANSFERENCIA' | 'TARJETA' | 'PSE';

  @IsString()
  @IsOptional()
  referencia?: string;
}

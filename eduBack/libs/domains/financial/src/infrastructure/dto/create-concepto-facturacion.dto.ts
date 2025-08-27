import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsDecimal,
} from 'class-validator';

export class CreateConceptoFacturacionDto {
  @IsNumber()
  @IsNotEmpty()
  institucionId: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsDecimal({ decimal_digits: '0,2', force_decimal: false })
  @IsNotEmpty()
  costoBase: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}

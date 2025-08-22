import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateConceptoFacturacionDto {
  @IsNumber()
  @IsOptional()
  institucionId?: number;

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @IsOptional()
  costoBase?: number;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}

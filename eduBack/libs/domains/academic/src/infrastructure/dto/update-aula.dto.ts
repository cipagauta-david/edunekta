import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateAulaDto {
  @IsNumber()
  @IsOptional()
  institucionId?: number;

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsNumber()
  @IsOptional()
  capacidad?: number;

  @IsString()
  @IsOptional()
  ubicacion?: string;
}

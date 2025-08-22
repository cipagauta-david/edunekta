import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateAsignaturaDto {
  @IsNumber()
  @IsOptional()
  institucionId?: number;

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}

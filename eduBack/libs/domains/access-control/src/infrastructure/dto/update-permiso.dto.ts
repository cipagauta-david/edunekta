import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdatePermisoDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  modulo?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}

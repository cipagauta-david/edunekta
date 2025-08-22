import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

export class CreatePermisoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

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

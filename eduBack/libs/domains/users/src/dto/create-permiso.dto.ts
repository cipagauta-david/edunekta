import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreatePermisoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  slug: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  descripcion?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  recurso?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  accion?: string;
}

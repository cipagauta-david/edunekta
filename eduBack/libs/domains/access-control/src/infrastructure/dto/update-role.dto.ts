import { IsString, IsArray, IsNumber, IsOptional } from 'class-validator';

export class UpdateRoleDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  permisos?: number[];
}

import { IsString, IsArray, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  permisos?: number[];
}

import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateGradoDto {
  @IsNumber()
  @IsOptional()
  institucionId?: number;

  @IsNumber()
  @IsOptional()
  nivelAcademicoId?: number;

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}

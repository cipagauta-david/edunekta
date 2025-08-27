import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateGrupoDto {
  @IsNumber()
  @IsOptional()
  institucionId?: number;

  @IsNumber()
  @IsOptional()
  gradoId?: number;

  @IsNumber()
  @IsOptional()
  periodoAcademicoId?: number;

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}

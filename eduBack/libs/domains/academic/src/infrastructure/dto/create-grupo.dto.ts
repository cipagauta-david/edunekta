import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateGrupoDto {
  @IsNumber()
  @IsNotEmpty()
  institucionId: number;

  @IsNumber()
  @IsNotEmpty()
  gradoId: number;

  @IsNumber()
  @IsNotEmpty()
  periodoAcademicoId: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}

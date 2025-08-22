import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateNivelAcademicoDto {
  @IsNumber()
  @IsNotEmpty()
  institucionId: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}

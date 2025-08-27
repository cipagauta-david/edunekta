import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateGradoDto {
  @IsNumber()
  @IsNotEmpty()
  institucionId: number;

  @IsNumber()
  @IsNotEmpty()
  nivelAcademicoId: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}

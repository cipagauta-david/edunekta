import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateAulaDto {
  @IsNumber()
  @IsNotEmpty()
  institucionId: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsOptional()
  capacidad?: number;

  @IsString()
  @IsOptional()
  ubicacion?: string;
}

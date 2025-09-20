import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsDateString,
  IsInt,
} from 'class-validator';
import { IsIn } from 'class-validator';
import type { TipoDocumento, Genero } from '../entities/usuario.entity';

export class CreateUserDto {
  @IsInt()
  @IsOptional()
  institucionId?: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsIn(['CC', 'TI', 'CE', 'PP'])
  @IsOptional()
  tipoDocumento?: TipoDocumento;

  @IsString()
  @IsOptional()
  documento?: string;

  @IsIn(['M', 'F', 'O'])
  @IsOptional()
  genero?: Genero;

  @IsDateString()
  @IsOptional()
  fechaNacimiento?: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  @IsOptional()
  fotoPerfil?: string;
}

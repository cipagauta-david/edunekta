import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsDateString,
  IsEnum,
  IsInt,
} from 'class-validator';
import { Rol, TipoDocumento, Genero } from '../entities/user.entity';

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

  @IsEnum(['CC', 'TI', 'CE', 'PP'])
  @IsOptional()
  tipoDocumento?: TipoDocumento;

  @IsString()
  @IsOptional()
  documento?: string;

  @IsEnum(['M', 'F', 'O'])
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

  @IsEnum(['ESTUDIANTE', 'PROFESOR', 'ACUDIENTE', 'ADMIN'])
  @IsNotEmpty()
  rol: Rol;

  @IsString()
  @IsOptional()
  fotoPerfil?: string;
}

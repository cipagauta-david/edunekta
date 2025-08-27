import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateComentarioForoDto {
  @IsInt()
  @IsNotEmpty()
  institucionId: number;

  @IsInt()
  @IsNotEmpty()
  foroId: number;

  @IsInt()
  @IsNotEmpty()
  usuarioIdAutor: number;

  @IsString()
  @IsNotEmpty()
  contenido: string;

  @IsInt()
  @IsOptional()
  parentId?: number;
}

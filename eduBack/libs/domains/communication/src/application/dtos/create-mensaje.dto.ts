import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateMensajeDto {
  @IsInt()
  @IsNotEmpty()
  institucionId: number;

  @IsInt()
  @IsNotEmpty()
  conversacionId: number;

  @IsInt()
  @IsNotEmpty()
  usuarioIdRemitente: number;

  @IsString()
  @IsNotEmpty()
  contenido: string;
}

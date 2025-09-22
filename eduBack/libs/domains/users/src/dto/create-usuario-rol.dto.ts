import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateUsuarioRolDto {
  @IsInt()
  @IsNotEmpty()
  usuarioId: number;

  @IsInt()
  @IsNotEmpty()
  rolId: number;
}

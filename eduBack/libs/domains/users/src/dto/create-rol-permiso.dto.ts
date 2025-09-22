import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateRolPermisoDto {
  @IsInt()
  @IsNotEmpty()
  rolId: number;

  @IsInt()
  @IsNotEmpty()
  permisoId: number;
}

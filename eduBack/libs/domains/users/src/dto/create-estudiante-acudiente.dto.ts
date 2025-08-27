import { IsInt, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateEstudianteAcudienteDto {
  @IsInt()
  @IsNotEmpty()
  institucionId: number;

  @IsInt()
  @IsNotEmpty()
  estudianteId: number;

  @IsInt()
  @IsNotEmpty()
  acudienteId: number;

  @IsEnum(['PADRE', 'MADRE', 'TUTOR', 'OTRO'])
  @IsNotEmpty()
  parentesco: 'PADRE' | 'MADRE' | 'TUTOR' | 'OTRO';
}

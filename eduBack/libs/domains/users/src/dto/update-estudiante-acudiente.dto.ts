import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateEstudianteAcudienteDto {
  @IsEnum(['PADRE', 'MADRE', 'TUTOR', 'OTRO'])
  @IsNotEmpty()
  parentesco: 'PADRE' | 'MADRE' | 'TUTOR' | 'OTRO';
}

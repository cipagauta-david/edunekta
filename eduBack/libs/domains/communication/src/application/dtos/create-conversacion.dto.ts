import { IsInt, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export class CreateConversacionDto {
  @IsInt()
  @IsNotEmpty()
  institucionId: number;

  @IsEnum(['ACTIVA', 'ARCHIVADA'])
  @IsOptional()
  estado?: 'ACTIVA'|'ARCHIVADA';
}

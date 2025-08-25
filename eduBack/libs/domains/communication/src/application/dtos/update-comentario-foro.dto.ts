import { PartialType } from '@nestjs/mapped-types';
import { CreateComentarioForoDto } from './create-comentario-foro.dto';

export class UpdateComentarioForoDto extends PartialType(CreateComentarioForoDto) {}

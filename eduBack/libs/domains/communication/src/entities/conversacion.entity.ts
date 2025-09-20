import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { Mensaje } from './mensaje.entity';
import { UsuarioConversacion } from './usuario-conversacion.entity';

@Index('fk_conv_inst', ['institucionId'], {})
@Entity('conversacion', { schema: 'edunekta3' })
export class Conversacion {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id' })
  institucionId: number;

  @Column('enum', {
    name: 'estado',
    enum: ['ACTIVA', 'ARCHIVADA'],
    default: () => "'ACTIVA'",
  })
  estado: 'ACTIVA' | 'ARCHIVADA';

  @Column('datetime', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @ManyToOne(() => Institucion, (institucion) => institucion.conversacions, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;

  @OneToMany(() => Mensaje, (mensaje) => mensaje.conversacion)
  mensajes: Mensaje[];

  @OneToMany(
    () => UsuarioConversacion,
    (usuarioConversacion) => usuarioConversacion.conversacion,
  )
  usuarioConversacions: UsuarioConversacion[];
}

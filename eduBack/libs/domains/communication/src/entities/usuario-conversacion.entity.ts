import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Conversacion } from './conversacion.entity';
import { Institucion } from '@app/domains/institutions';
import { Usuario } from '@app/domains/users';

@Index('fk_usrconv_conv', ['conversacionId'], {})
@Index('fk_usrconv_usr', ['usuarioId'], {})
@Index('uq_usr_conv', ['institucionId', 'conversacionId', 'usuarioId'], {
  unique: true,
})
@Entity('usuario_conversacion', { schema: 'edunekta3' })
export class UsuarioConversacion {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id' })
  institucionId: number;

  @Column('int', { name: 'conversacion_id' })
  conversacionId: number;

  @Column('int', { name: 'usuario_id' })
  usuarioId: number;

  @Column('datetime', { name: 'last_read_at', nullable: true })
  lastReadAt: Date | null;

  @ManyToOne(
    () => Conversacion,
    (conversacion) => conversacion.usuarioConversacions,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'conversacion_id', referencedColumnName: 'id' }])
  conversacion: Conversacion;

  @ManyToOne(
    () => Institucion,
    (institucion) => institucion.usuarioConversacions,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;

  @ManyToOne(() => Usuario, (usuario) => usuario.usuarioConversacions, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'usuario_id', referencedColumnName: 'id' }])
  usuario: Usuario;
}

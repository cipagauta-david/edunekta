import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// IMPORTANT: Avoid importing via the barrel to prevent circular dependency during metadata collection
import { Conversacion } from './conversacion.entity';
import { Institucion } from '@app/domains/institutions';
import { Usuario } from '@app/domains/users';

@Index('fk_msg_conv', ['conversacionId'], {})
@Index('fk_msg_usr', ['usuarioIdRemitente'], {})
@Index(
  'idx_mensaje_conv',
  ['institucionId', 'conversacionId', 'fechaEnvio'],
  {},
)
@Entity('mensaje', { schema: 'edunekta3' })
export class Mensaje {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id' })
  institucionId: number;

  @Column('int', { name: 'conversacion_id' })
  conversacionId: number;

  @Column('int', { name: 'usuario_id_remitente' })
  usuarioIdRemitente: number;

  @Column('text', { name: 'contenido' })
  contenido: string;

  @Column('datetime', {
    name: 'fecha_envio',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaEnvio: Date | null;

  @ManyToOne(() => Conversacion, (conversacion) => conversacion.mensajes, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'conversacion_id', referencedColumnName: 'id' }])
  conversacion: Conversacion;

  @ManyToOne(() => Institucion, (institucion) => institucion.mensajes, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;

  @ManyToOne(() => Usuario, (usuario) => usuario.mensajes, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'usuario_id_remitente', referencedColumnName: 'id' }])
  usuarioIdRemitente2: Usuario;
}

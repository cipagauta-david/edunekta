import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { Usuario } from '@app/domains/users';

@Index('fk_notif_inst', ['institucionId'], {})
@Index('fk_notif_usr', ['usuarioId'], {})
@Entity('notificacion', { schema: 'edunekta3' })
export class Notificacion {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id' })
  institucionId: number;

  @Column('int', { name: 'usuario_id' })
  usuarioId: number;

  @Column('varchar', { name: 'titulo', length: 255 })
  titulo: string;

  @Column('text', { name: 'mensaje' })
  mensaje: string;

  @Column('enum', {
    name: 'canal',
    enum: ['APP', 'EMAIL', 'SMS'],
    default: () => "'APP'",
  })
  canal: 'APP' | 'EMAIL' | 'SMS';

  @Column('enum', {
    name: 'prioridad',
    enum: ['BAJA', 'MEDIA', 'ALTA'],
    default: () => "'MEDIA'",
  })
  prioridad: 'BAJA' | 'MEDIA' | 'ALTA';

  @Column('enum', {
    name: 'estado',
    enum: ['NO_LEIDA', 'LEIDA'],
    default: () => "'NO_LEIDA'",
  })
  estado: 'NO_LEIDA' | 'LEIDA';

  @Column('text', { name: 'url_destino', nullable: true })
  urlDestino: string | null;

  @Column('datetime', {
    name: 'fecha',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha: Date | null;

  @ManyToOne(() => Institucion, (institucion) => institucion.notificacions, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;

  @ManyToOne(() => Usuario, (usuario) => usuario.notificacions, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'usuario_id', referencedColumnName: 'id' }])
  usuario: Usuario;
}

import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { Conversacion } from './conversacion.entity';
import { User } from '@app/domains/users';

@Entity('mensaje')
export class Mensaje {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'institucion_id', type: 'int' })
  institucionId: number;

  @Column({ name: 'conversacion_id', type: 'int' })
  conversacionId: number;

  @Column({ name: 'usuario_id_remitente', type: 'int' })
  usuarioIdRemitente: number;

  @Column({ name: 'contenido', type: 'text' })
  contenido: string;

  @Column({ name: 'fecha_envio', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fechaEnvio: Date;

  // Relations
  @ManyToOne(() => Institucion, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'institucion_id' })
  institucion?: Institucion;

  @ManyToOne(() => Conversacion, (c) => c.mensajes, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'conversacion_id' })
  conversacion?: Conversacion;

  @ManyToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'usuario_id_remitente' })
  remitente?: User;
}

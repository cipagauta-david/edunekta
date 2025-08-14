import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { Conversacion } from './conversacion.entity';
import { User } from '@app/domains/users';

@Entity('usuario_conversacion')
export class UsuarioConversacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'institucion_id', type: 'int' })
  institucionId: number;

  @Column({ name: 'conversacion_id', type: 'int' })
  conversacionId: number;

  @Column({ name: 'usuario_id', type: 'int' })
  usuarioId: number;

  @Column({ name: 'last_read_at', type: 'datetime', nullable: true })
  lastReadAt?: Date | null;

  // Relations
  @ManyToOne(() => Institucion, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'institucion_id' })
  institucion?: Institucion;

  @ManyToOne(() => Conversacion, (c) => c.usuarios, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'conversacion_id' })
  conversacion?: Conversacion;

  @ManyToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'usuario_id' })
  usuario?: User;
}

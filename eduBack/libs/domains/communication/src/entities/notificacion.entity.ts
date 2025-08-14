import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { User } from '@app/domains/users';

@Entity('notificacion')
export class Notificacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'institucion_id', type: 'int' })
  institucionId: number;

  @Column({ name: 'usuario_id', type: 'int' })
  usuarioId: number;

  @Column({ name: 'titulo', type: 'varchar', length: 255 })
  titulo: string;

  @Column({ name: 'mensaje', type: 'text' })
  mensaje: string;

  @Column({ name: 'canal', type: 'enum', enum: ['APP','EMAIL','SMS'], default: 'APP' })
  canal: 'APP'|'EMAIL'|'SMS';

  @Column({ name: 'prioridad', type: 'enum', enum: ['BAJA','MEDIA','ALTA'], default: 'MEDIA' })
  prioridad: 'BAJA'|'MEDIA'|'ALTA';

  @Column({ name: 'estado', type: 'enum', enum: ['NO_LEIDA','LEIDA'], default: 'NO_LEIDA' })
  estado: 'NO_LEIDA'|'LEIDA';

  @Column({ name: 'url_destino', type: 'text', nullable: true })
  urlDestino?: string | null;

  @Column({ name: 'fecha', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  // Relations
  @ManyToOne(() => Institucion, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'institucion_id' })
  institucion?: Institucion;

  @ManyToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'usuario_id' })
  usuario?: User;
}

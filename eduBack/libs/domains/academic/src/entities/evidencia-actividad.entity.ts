import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { Actividad } from './actividad.entity';
import { User } from '@app/domains/users';

@Entity('evidencia_actividad')
export class EvidenciaActividad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'institucion_id', type: 'int' })
  institucionId: number;

  @Column({ name: 'actividad_id', type: 'int' })
  actividadId: number;

  @Column({ name: 'estudiante_id', type: 'int' })
  estudianteId: number;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion?: string | null;

  @Column({ name: 'fecha_subida', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fechaSubida: Date;

  @Column({ name: 'calificacion', type: 'decimal', precision: 5, scale: 2, nullable: true })
  calificacion?: string | null;

  // Relations
  @ManyToOne(() => Institucion, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'institucion_id' })
  institucion?: Institucion;

  @ManyToOne(() => Actividad, (a) => a.evidencias, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'actividad_id' })
  actividad?: Actividad;

  @ManyToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'estudiante_id' })
  estudiante?: User;
}

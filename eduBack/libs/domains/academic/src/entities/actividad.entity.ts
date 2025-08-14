import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { Clase } from './clase.entity';
import { EvidenciaActividad } from './evidencia-actividad.entity';

@Entity('actividad')
export class Actividad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'institucion_id', type: 'int' })
  institucionId: number;

  @Column({ name: 'titulo', type: 'varchar', length: 255 })
  titulo: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion?: string | null;

  @Column({ name: 'fecha_entrega', type: 'datetime', nullable: true })
  fechaEntrega?: Date | null;

  @Column({ name: 'clase_id', type: 'int' })
  claseId: number;

  @Column({ name: 'estado', type: 'enum', enum: ['PUBLICADA','CERRADA','CALIFICADA'], default: 'PUBLICADA' })
  estado: 'PUBLICADA'|'CERRADA'|'CALIFICADA';

  @Column({ name: 'categoria', type: 'enum', enum: ['TAREA','EXAMEN','PROYECTO','PARTICIPACION'] })
  categoria: 'TAREA'|'EXAMEN'|'PROYECTO'|'PARTICIPACION';

  @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Institucion, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'institucion_id' })
  institucion?: Institucion;

  @ManyToOne(() => Clase, (c) => c.actividades, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'clase_id' })
  clase?: Clase;

  @OneToMany(() => EvidenciaActividad, (e) => e.actividad)
  evidencias?: EvidenciaActividad[];
}

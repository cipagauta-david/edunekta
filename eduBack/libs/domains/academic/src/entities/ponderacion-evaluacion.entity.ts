import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { Clase } from './clase.entity';

@Entity('ponderacion_evaluacion')
export class PonderacionEvaluacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'institucion_id', type: 'int' })
  institucionId: number;

  @Column({ name: 'clase_id', type: 'int' })
  claseId: number;

  @Column({ name: 'categoria', type: 'enum', enum: ['TAREA','EXAMEN','PROYECTO','PARTICIPACION'] })
  categoria: 'TAREA'|'EXAMEN'|'PROYECTO'|'PARTICIPACION';

  @Column({ name: 'porcentaje', type: 'decimal', precision: 5, scale: 2 })
  porcentaje: string;

  // Relations
  @ManyToOne(() => Institucion, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'institucion_id' })
  institucion?: Institucion;

  @ManyToOne(() => Clase, (c) => c.ponderaciones, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'clase_id' })
  clase?: Clase;
}

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Clase } from './clase.entity';
import { Institucion } from '@app/domains/institutions';

@Index('fk_pond_clase', ['claseId'], {})
@Index('uq_pond_cat', ['institucionId', 'claseId', 'categoria'], {
  unique: true,
})
@Entity('ponderacion_evaluacion', { schema: 'edunekta3' })
export class PonderacionEvaluacion {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id' })
  institucionId: number;

  @Column('int', { name: 'clase_id' })
  claseId: number;

  @Column('enum', {
    name: 'categoria',
    enum: ['TAREA', 'EXAMEN', 'PROYECTO', 'PARTICIPACION'],
  })
  categoria: 'TAREA' | 'EXAMEN' | 'PROYECTO' | 'PARTICIPACION';

  @Column('decimal', { name: 'porcentaje', precision: 5, scale: 2 })
  porcentaje: string;

  @ManyToOne(() => Clase, (clase) => clase.ponderacionEvaluacions, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'clase_id', referencedColumnName: 'id' }])
  clase: Clase;

  @ManyToOne(
    () => Institucion,
    (institucion) => institucion.ponderacionEvaluacions,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;
}

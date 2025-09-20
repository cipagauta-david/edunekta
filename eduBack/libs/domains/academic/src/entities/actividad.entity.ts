import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Clase } from './clase.entity';
import { EvidenciaActividad } from './evidencia-actividad.entity';
import { Institucion } from '@app/domains/institutions';

@Index('fk_actividad_clase', ['claseId'], {})
@Index('fk_actividad_inst', ['institucionId'], {})
@Entity('actividad', { schema: 'edunekta3' })
export class Actividad {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id' })
  institucionId: number;

  @Column('varchar', { name: 'titulo', length: 255 })
  titulo: string;

  @Column('text', { name: 'descripcion', nullable: true })
  descripcion: string | null;

  @Column('datetime', { name: 'fecha_entrega', nullable: true })
  fechaEntrega: Date | null;

  @Column('int', { name: 'clase_id' })
  claseId: number;

  @Column('enum', {
    name: 'estado',
    enum: ['PUBLICADA', 'CERRADA', 'CALIFICADA'],
    default: () => "'PUBLICADA'",
  })
  estado: 'PUBLICADA' | 'CERRADA' | 'CALIFICADA';

  @Column('enum', {
    name: 'categoria',
    enum: ['TAREA', 'EXAMEN', 'PROYECTO', 'PARTICIPACION'],
  })
  categoria: 'TAREA' | 'EXAMEN' | 'PROYECTO' | 'PARTICIPACION';

  @Column('datetime', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @Column('datetime', {
    name: 'updated_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date | null;

  @ManyToOne(() => Clase, (clase) => clase.actividads, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'clase_id', referencedColumnName: 'id' }])
  clase: Clase;

  @ManyToOne(() => Institucion, (institucion) => institucion.actividads, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;

  @OneToMany(
    () => EvidenciaActividad,
    (evidenciaActividad) => evidenciaActividad.actividad,
  )
  evidenciaActividads: EvidenciaActividad[];
}

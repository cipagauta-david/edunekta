import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { CalificacionPeriodo, Clase } from '@app/domains/academic';

@Index('uq_asignatura_nombre', ['institucionId', 'nombre'], { unique: true })
@Entity('asignatura', { schema: 'edunekta3' })
export class Asignatura {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id' })
  institucionId: number;

  @Column('varchar', { name: 'nombre', length: 150 })
  nombre: string;

  @Column('text', { name: 'descripcion', nullable: true })
  descripcion: string | null;

  @ManyToOne(() => Institucion, (institucion) => institucion.asignaturas, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;

  @OneToMany(
    () => CalificacionPeriodo,
    (calificacionPeriodo) => calificacionPeriodo.asignatura,
  )
  calificacionPeriodos: CalificacionPeriodo[];

  @OneToMany(() => Clase, (clase) => clase.asignatura)
  clases: Clase[];
}

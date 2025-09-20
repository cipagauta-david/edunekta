import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CalificacionPeriodo } from './calificacion-periodo.entity';
import { Clase } from './clase.entity';
import { Grupo } from './grupo.entity';
import { Matricula } from './matricula.entity';
import { Institucion } from '@app/domains/institutions';

@Index('uq_periodo_nombre', ['institucionId', 'nombre'], { unique: true })
@Entity('periodo_academico', { schema: 'edunekta3' })
export class PeriodoAcademico {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id' })
  institucionId: number;

  @Column('varchar', { name: 'nombre', length: 50 })
  nombre: string;

  @Column('enum', {
    name: 'estado',
    enum: ['PLANIFICADO', 'EN_CURSO', 'FINALIZADO', 'ARCHIVADO'],
    default: () => "'PLANIFICADO'",
  })
  estado: 'PLANIFICADO' | 'EN_CURSO' | 'FINALIZADO' | 'ARCHIVADO';

  @Column('date', { name: 'fecha_inicio' })
  fechaInicio: string;

  @Column('date', { name: 'fecha_fin' })
  fechaFin: string;

  @OneToMany(
    () => CalificacionPeriodo,
    (calificacionPeriodo) => calificacionPeriodo.periodoAcademico,
  )
  calificacionPeriodos: CalificacionPeriodo[];

  @OneToMany(() => Clase, (clase) => clase.periodoAcademico)
  clases: Clase[];

  @OneToMany(() => Grupo, (grupo) => grupo.periodoAcademico)
  grupos: Grupo[];

  @OneToMany(() => Matricula, (matricula) => matricula.periodoAcademico)
  matriculas: Matricula[];

  @ManyToOne(
    () => Institucion,
    (institucion) => institucion.periodoAcademicos,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;
}

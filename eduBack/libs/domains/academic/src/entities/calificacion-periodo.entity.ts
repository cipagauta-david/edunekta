import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Asignatura } from './asignatura.entity';
import { Usuario } from '@app/domains/users';
import { Institucion } from '@app/domains/institutions';
import { PeriodoAcademico } from './periodo-academico.entity';

@Index('fk_calif_asig', ['asignaturaId'], {})
@Index('fk_calif_est', ['estudianteId'], {})
@Index('fk_calif_periodo', ['periodoAcademicoId'], {})
@Index(
  'uq_calif',
  ['institucionId', 'estudianteId', 'asignaturaId', 'periodoAcademicoId'],
  { unique: true },
)
@Entity('calificacion_periodo', { schema: 'edunekta3' })
export class CalificacionPeriodo {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id' })
  institucionId: number;

  @Column('int', { name: 'estudiante_id' })
  estudianteId: number;

  @Column('int', { name: 'asignatura_id' })
  asignaturaId: number;

  @Column('int', { name: 'periodo_academico_id' })
  periodoAcademicoId: number;

  @Column('decimal', { name: 'nota_final', precision: 5, scale: 2 })
  notaFinal: string;

  @Column('text', { name: 'observaciones', nullable: true })
  observaciones: string | null;

  @ManyToOne(
    () => Asignatura,
    (asignatura) => asignatura.calificacionPeriodos,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'asignatura_id', referencedColumnName: 'id' }])
  asignatura: Asignatura;

  @ManyToOne(() => Usuario, (usuario) => usuario.calificacionPeriodos, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'estudiante_id', referencedColumnName: 'id' }])
  estudiante: Usuario;

  @ManyToOne(
    () => Institucion,
    (institucion) => institucion.calificacionPeriodos,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;

  @ManyToOne(
    () => PeriodoAcademico,
    (periodoAcademico) => periodoAcademico.calificacionPeriodos,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'periodo_academico_id', referencedColumnName: 'id' }])
  periodoAcademico: PeriodoAcademico;
}

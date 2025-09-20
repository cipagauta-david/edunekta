import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Actividad } from './actividad.entity';
import { Asistencia } from './asistencia.entity';
import { Asignatura } from './asignatura.entity';
import { Aula } from './aula.entity';
import { Grupo } from './grupo.entity';
import { Institucion } from '@app/domains/institutions';
import { PeriodoAcademico } from './periodo-academico.entity';
import { Usuario } from '@app/domains/users';
import { PonderacionEvaluacion } from './ponderacion-evaluacion.entity';

@Index('fk_clase_asign', ['asignaturaId'], {})
@Index('fk_clase_aula', ['aulaId'], {})
@Index('fk_clase_grupo', ['grupoId'], {})
@Index('fk_clase_periodo', ['periodoAcademicoId'], {})
@Index('fk_clase_prof', ['profesorId'], {})
@Index(
  'idx_clase_grupo',
  ['institucionId', 'periodoAcademicoId', 'grupoId', 'dia', 'horaInicio'],
  {},
)
@Index(
  'idx_clase_profesor',
  ['institucionId', 'periodoAcademicoId', 'profesorId', 'dia', 'horaInicio'],
  {},
)
@Entity('clase', { schema: 'edunekta3' })
export class Clase {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id' })
  institucionId: number;

  @Column('varchar', { name: 'nombre', nullable: true, length: 200 })
  nombre: string | null;

  @Column('enum', {
    name: 'dia',
    enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  })
  dia: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado';

  @Column('time', { name: 'hora_inicio' })
  horaInicio: string;

  @Column('time', { name: 'hora_fin' })
  horaFin: string;

  @Column('int', { name: 'grupo_id' })
  grupoId: number;

  @Column('int', { name: 'periodo_academico_id' })
  periodoAcademicoId: number;

  @Column('int', { name: 'aula_id' })
  aulaId: number;

  @Column('int', { name: 'asignatura_id' })
  asignaturaId: number;

  @Column('int', { name: 'profesor_id' })
  profesorId: number;

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

  @OneToMany(() => Actividad, (actividad) => actividad.clase)
  actividads: Actividad[];

  @OneToMany(() => Asistencia, (asistencia) => asistencia.clase)
  asistencias: Asistencia[];

  @ManyToOne(() => Asignatura, (asignatura) => asignatura.clases, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'asignatura_id', referencedColumnName: 'id' }])
  asignatura: Asignatura;

  @ManyToOne(() => Aula, (aula) => aula.clases, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'aula_id', referencedColumnName: 'id' }])
  aula: Aula;

  @ManyToOne(() => Grupo, (grupo) => grupo.clases, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'grupo_id', referencedColumnName: 'id' }])
  grupo: Grupo;

  @ManyToOne(() => Institucion, (institucion) => institucion.clases, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;

  @ManyToOne(
    () => PeriodoAcademico,
    (periodoAcademico) => periodoAcademico.clases,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'periodo_academico_id', referencedColumnName: 'id' }])
  periodoAcademico: PeriodoAcademico;

  @ManyToOne(() => Usuario, (usuario) => usuario.clases, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'profesor_id', referencedColumnName: 'id' }])
  profesor: Usuario;

  @OneToMany(
    () => PonderacionEvaluacion,
    (ponderacionEvaluacion) => ponderacionEvaluacion.clase,
  )
  ponderacionEvaluacions: PonderacionEvaluacion[];
}

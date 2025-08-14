import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { Grupo } from './grupo.entity';
import { PeriodoAcademico } from './periodo-academico.entity';
import { Aula } from './aula.entity';
import { Asignatura } from './asignatura.entity';
import { User } from '@app/domains/users';
import { Actividad } from './actividad.entity';
import { Asistencia } from './asistencia.entity';
import { PonderacionEvaluacion } from './ponderacion-evaluacion.entity';

@Entity('clase')
export class Clase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'institucion_id', type: 'int' })
  institucionId: number;

  @Column({ name: 'nombre', type: 'varchar', length: 200, nullable: true })
  nombre?: string | null;

  @Column({ name: 'dia', type: 'enum', enum: ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'] })
  dia: 'Lunes'|'Martes'|'Miércoles'|'Jueves'|'Viernes'|'Sábado';

  @Column({ name: 'hora_inicio', type: 'time' })
  horaInicio: string;

  @Column({ name: 'hora_fin', type: 'time' })
  horaFin: string;

  @Column({ name: 'grupo_id', type: 'int' })
  grupoId: number;

  @Column({ name: 'periodo_academico_id', type: 'int' })
  periodoAcademicoId: number;

  @Column({ name: 'aula_id', type: 'int' })
  aulaId: number;

  @Column({ name: 'asignatura_id', type: 'int' })
  asignaturaId: number;

  @Column({ name: 'profesor_id', type: 'int' })
  profesorId: number;

  @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Institucion, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'institucion_id' })
  institucion?: Institucion;

  @ManyToOne(() => Grupo, (g) => g.clases, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'grupo_id' })
  grupo?: Grupo;

  @ManyToOne(() => PeriodoAcademico, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'periodo_academico_id' })
  periodoAcademico?: PeriodoAcademico;

  @ManyToOne(() => Aula, (a) => a.clases, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'aula_id' })
  aula?: Aula;

  @ManyToOne(() => Asignatura, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'asignatura_id' })
  asignatura?: Asignatura;

  @ManyToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'profesor_id' })
  profesor?: User;

  @OneToMany(() => Actividad, (a) => a.clase)
  actividades?: Actividad[];

  @OneToMany(() => Asistencia, (a) => a.clase)
  asistencias?: Asistencia[];

  @OneToMany(() => PonderacionEvaluacion, (p) => p.clase)
  ponderaciones?: PonderacionEvaluacion[];
}

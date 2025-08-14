import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { Clase } from './clase.entity';
import { Grado } from './grado.entity';
import { Grupo } from './grupo.entity';
import { PeriodoAcademico } from './periodo-academico.entity';
import { User } from '@app/domains/users';

@Entity('matricula')
export class Matricula {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'institucion_id', type: 'int' })
  institucionId: number;

  @Column({ name: 'estudiante_id', type: 'int' })
  estudianteId: number;

  @Column({ name: 'grado_id', type: 'int' })
  gradoId: number;

  @Column({ name: 'grupo_id', type: 'int' })
  grupoId: number;

  @Column({ name: 'periodo_academico_id', type: 'int' })
  periodoAcademicoId: number;

  @Column({ name: 'estado', type: 'enum', enum: ['ACTIVA','RETIRADO','FINALIZADA','PENDIENTE'], default: 'ACTIVA' })
  estado: 'ACTIVA'|'RETIRADO'|'FINALIZADA'|'PENDIENTE';

  @Column({ name: 'fecha_matricula', type: 'date' })
  fechaMatricula: string;

  // Relations
  @ManyToOne(() => Institucion, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'institucion_id' })
  institucion?: Institucion;

  @ManyToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'estudiante_id' })
  estudiante?: User;

  @ManyToOne(() => Grado, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'grado_id' })
  grado?: Grado;

  @ManyToOne(() => Grupo, (g) => g.matriculas, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'grupo_id' })
  grupo?: Grupo;

  @ManyToOne(() => PeriodoAcademico, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'periodo_academico_id' })
  periodo?: PeriodoAcademico;
}

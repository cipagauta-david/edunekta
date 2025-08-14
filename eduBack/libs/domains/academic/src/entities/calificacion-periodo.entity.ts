import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { User } from '@app/domains/users';
import { Asignatura } from './asignatura.entity';
import { PeriodoAcademico } from './periodo-academico.entity';

@Entity('calificacion_periodo')
export class CalificacionPeriodo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'institucion_id', type: 'int' })
  institucionId: number;

  @Column({ name: 'estudiante_id', type: 'int' })
  estudianteId: number;

  @Column({ name: 'asignatura_id', type: 'int' })
  asignaturaId: number;

  @Column({ name: 'periodo_academico_id', type: 'int' })
  periodoAcademicoId: number;

  @Column({ name: 'nota_final', type: 'decimal', precision: 5, scale: 2 })
  notaFinal: string;

  @Column({ name: 'observaciones', type: 'text', nullable: true })
  observaciones?: string | null;

  // Relations
  @ManyToOne(() => Institucion, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'institucion_id' })
  institucion?: Institucion;

  @ManyToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'estudiante_id' })
  estudiante?: User;

  @ManyToOne(() => Asignatura, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'asignatura_id' })
  asignatura?: Asignatura;

  @ManyToOne(() => PeriodoAcademico, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'periodo_academico_id' })
  periodo?: PeriodoAcademico;
}

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from '@app/domains/users';
import { Grado } from './grado.entity';
import { Grupo } from './grupo.entity';
import { Institucion } from '@app/domains/institutions';
import { PeriodoAcademico } from './periodo-academico.entity';

@Index('fk_matricula_est', ['estudianteId'], {})
@Index('fk_matricula_grado', ['gradoId'], {})
@Index('fk_matricula_grupo', ['grupoId'], {})
@Index('fk_matricula_periodo', ['periodoAcademicoId'], {})
@Index(
  'uq_matricula_est_per',
  ['institucionId', 'estudianteId', 'periodoAcademicoId'],
  { unique: true },
)
@Entity('matricula', { schema: 'edunekta3' })
export class Matricula {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id' })
  institucionId: number;

  @Column('int', { name: 'estudiante_id' })
  estudianteId: number;

  @Column('int', { name: 'grado_id' })
  gradoId: number;

  @Column('int', { name: 'grupo_id' })
  grupoId: number;

  @Column('int', { name: 'periodo_academico_id' })
  periodoAcademicoId: number;

  @Column('enum', {
    name: 'estado',
    enum: ['ACTIVA', 'RETIRADO', 'FINALIZADA', 'PENDIENTE'],
    default: () => "'ACTIVA'",
  })
  estado: 'ACTIVA' | 'RETIRADO' | 'FINALIZADA' | 'PENDIENTE';

  @Column('date', { name: 'fecha_matricula' })
  fechaMatricula: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.matriculas, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'estudiante_id', referencedColumnName: 'id' }])
  estudiante: Usuario;

  @ManyToOne(() => Grado, (grado) => grado.matriculas, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'grado_id', referencedColumnName: 'id' }])
  grado: Grado;

  @ManyToOne(() => Grupo, (grupo) => grupo.matriculas, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'grupo_id', referencedColumnName: 'id' }])
  grupo: Grupo;

  @ManyToOne(() => Institucion, (institucion) => institucion.matriculas, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;

  @ManyToOne(
    () => PeriodoAcademico,
    (periodoAcademico) => periodoAcademico.matriculas,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'periodo_academico_id', referencedColumnName: 'id' }])
  periodoAcademico: PeriodoAcademico;
}

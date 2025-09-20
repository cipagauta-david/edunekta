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
import { Grado } from './grado.entity';
import { Institucion } from '@app/domains/institutions';
import { PeriodoAcademico } from './periodo-academico.entity';
import { Matricula } from './matricula.entity';

@Index('fk_grupo_grado', ['gradoId'], {})
@Index('fk_grupo_periodo', ['periodoAcademicoId'], {})
@Index(
  'uq_grupo',
  ['institucionId', 'gradoId', 'periodoAcademicoId', 'nombre'],
  { unique: true },
)
@Entity('grupo', { schema: 'edunekta3' })
export class Grupo {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id' })
  institucionId: number;

  @Column('int', { name: 'grado_id' })
  gradoId: number;

  @Column('int', { name: 'periodo_academico_id' })
  periodoAcademicoId: number;

  @Column('varchar', { name: 'nombre', length: 50 })
  nombre: string;

  @Column('text', { name: 'descripcion', nullable: true })
  descripcion: string | null;

  @OneToMany(() => Clase, (clase) => clase.grupo)
  clases: Clase[];

  @ManyToOne(() => Grado, (grado) => grado.grupos, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'grado_id', referencedColumnName: 'id' }])
  grado: Grado;

  @ManyToOne(() => Institucion, (institucion) => institucion.grupos, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;

  @ManyToOne(
    () => PeriodoAcademico,
    (periodoAcademico) => periodoAcademico.grupos,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'periodo_academico_id', referencedColumnName: 'id' }])
  periodoAcademico: PeriodoAcademico;

  @OneToMany(() => Matricula, (matricula) => matricula.grupo)
  matriculas: Matricula[];
}

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
import { NivelAcademico } from './nivel-academico.entity';
import { Grupo } from './grupo.entity';
import { Matricula } from './matricula.entity';

@Index('fk_grado_nivel', ['nivelAcademicoId'], {})
@Index('uq_grado_nombre', ['institucionId', 'nombre'], { unique: true })
@Entity('grado', { schema: 'edunekta3' })
export class Grado {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id' })
  institucionId: number;

  @Column('int', { name: 'nivel_academico_id' })
  nivelAcademicoId: number;

  @Column('varchar', { name: 'nombre', length: 100 })
  nombre: string;

  @Column('text', { name: 'descripcion', nullable: true })
  descripcion: string | null;

  @ManyToOne(() => Institucion, (institucion) => institucion.grados, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;

  @ManyToOne(() => NivelAcademico, (nivelAcademico) => nivelAcademico.grados, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'nivel_academico_id', referencedColumnName: 'id' }])
  nivelAcademico: NivelAcademico;

  @OneToMany(() => Grupo, (grupo) => grupo.grado)
  grupos: Grupo[];

  @OneToMany(() => Matricula, (matricula) => matricula.grado)
  matriculas: Matricula[];
}

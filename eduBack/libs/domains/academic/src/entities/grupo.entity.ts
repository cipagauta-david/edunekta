import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { Grado } from './grado.entity';
import { PeriodoAcademico } from './periodo-academico.entity';
import { Clase } from './clase.entity';
import { Matricula } from './matricula.entity';

@Entity('grupo')
export class Grupo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'institucion_id', type: 'int' })
  institucionId: number;

  @Column({ name: 'grado_id', type: 'int' })
  gradoId: number;

  @Column({ name: 'periodo_academico_id', type: 'int' })
  periodoAcademicoId: number;

  @Column({ name: 'nombre', type: 'varchar', length: 50 })
  nombre: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion?: string | null;

  // Relations
  @ManyToOne(() => Institucion, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'institucion_id' })
  institucion?: Institucion;

  @ManyToOne(() => Grado, (g) => g.grupos, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'grado_id' })
  grado?: Grado;

  @ManyToOne(() => PeriodoAcademico, (p) => p.grupos, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'periodo_academico_id' })
  periodoAcademico?: PeriodoAcademico;

  @OneToMany(() => Clase, (c) => c.grupo)
  clases?: Clase[];

  @OneToMany(() => Matricula, (m) => m.grupo)
  matriculas?: Matricula[];
}

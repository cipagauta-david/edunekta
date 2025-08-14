import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { NivelAcademico } from './nivel-academico.entity';
import { Grupo } from './grupo.entity';

@Entity('grado')
export class Grado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'institucion_id', type: 'int' })
  institucionId: number;

  @Column({ name: 'nivel_academico_id', type: 'int' })
  nivelAcademicoId: number;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  nombre: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion?: string | null;

  // Relations
  @ManyToOne(() => Institucion, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'institucion_id' })
  institucion?: Institucion;

  @ManyToOne(() => NivelAcademico, (n) => n.grados, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'nivel_academico_id' })
  nivelAcademico?: NivelAcademico;

  @OneToMany(() => Grupo, (g) => g.grado)
  grupos?: Grupo[];
}

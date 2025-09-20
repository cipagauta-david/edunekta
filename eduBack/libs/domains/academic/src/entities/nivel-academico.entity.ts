import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Grado } from './grado.entity';
import { Institucion } from '@app/domains/institutions';

@Index('uq_nivel_nombre', ['institucionId', 'nombre'], { unique: true })
@Entity('nivel_academico', { schema: 'edunekta3' })
export class NivelAcademico {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id' })
  institucionId: number;

  @Column('varchar', { name: 'nombre', length: 100 })
  nombre: string;

  @Column('text', { name: 'descripcion', nullable: true })
  descripcion: string | null;

  @OneToMany(() => Grado, (grado) => grado.nivelAcademico)
  grados: Grado[];

  @ManyToOne(() => Institucion, (institucion) => institucion.nivelAcademicos, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;
}

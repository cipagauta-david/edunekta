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
import { Clase } from '@app/domains/academic';

@Index('uq_aula_nombre', ['institucionId', 'nombre'], { unique: true })
@Entity('aula', { schema: 'edunekta3' })
export class Aula {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id' })
  institucionId: number;

  @Column('varchar', { name: 'nombre', length: 100 })
  nombre: string;

  @Column('int', { name: 'capacidad', nullable: true })
  capacidad: number | null;

  @Column('text', { name: 'ubicacion', nullable: true })
  ubicacion: string | null;

  @ManyToOne(() => Institucion, (institucion) => institucion.aulas, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;

  @OneToMany(() => Clase, (clase) => clase.aula)
  clases: Clase[];
}

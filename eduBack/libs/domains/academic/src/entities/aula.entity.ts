import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { Clase } from './clase.entity';

@Entity('aula')
export class Aula {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'institucion_id', type: 'int' })
  institucionId: number;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  nombre: string;

  @Column({ name: 'capacidad', type: 'int', nullable: true })
  capacidad?: number | null;

  @Column({ name: 'ubicacion', type: 'text', nullable: true })
  ubicacion?: string | null;

  // Relations
  @ManyToOne(() => Institucion, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'institucion_id' })
  institucion?: Institucion;

  @OneToMany(() => Clase, (c) => c.aula)
  clases?: Clase[];
}

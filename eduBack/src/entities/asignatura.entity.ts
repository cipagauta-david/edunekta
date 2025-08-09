import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Actividad } from './actividad.entity';

@Entity('asignatura')
export class Asignatura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ unique: true, length: 20 })
  codigo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'int', default: 1 })
  creditos: number;

  @Column({ type: 'int', default: 1 })
  horas_semanales: number;

  @Column({
    type: 'enum',
    enum: ['Obligatoria', 'Electiva', 'Optativa'],
    default: 'Obligatoria',
  })
  tipo_asignatura: string;

  @Column({ type: 'text', nullable: true })
  objetivos: string;

  @Column({ type: 'text', nullable: true })
  contenido_programatico: string;

  @Column({ type: 'text', nullable: true })
  metodologia: string;

  @Column({ type: 'text', nullable: true })
  recursos_necesarios: string;

  @Column({ type: 'text', nullable: true })
  bibliografia: string;

  @Column({ type: 'boolean', default: true })
  activa: boolean;

  @Column({ nullable: true })
  nivel_academico_id: number;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_actualizacion: Date;

  // Relationships
  @OneToMany(() => Actividad, (actividad) => actividad.asignatura)
  actividades: Actividad[];
}

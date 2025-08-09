import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  OneToMany 
} from 'typeorm';
import { Actividad } from '../../activities/entities/actividad.entity';

@Entity('asignatura')
export class Asignatura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 20, unique: true })
  codigo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'int', nullable: true })
  creditos: number;

  @Column({ type: 'int', nullable: true })
  horas_semanales: number;

  @Column({ length: 50, nullable: true })
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
  activo: boolean;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_actualizacion: Date;

  // Foreign Keys
  @Column({ nullable: true })
  nivel_academico_id: number;

  // Relationships
  @OneToMany(() => Actividad, (actividad) => actividad.asignatura)
  actividades: Actividad[];
}


import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToOne, 
  JoinColumn 
} from 'typeorm';
import { Asignatura } from '../../subjects/entities/asignatura.entity';
import { User } from '../../../users/entities/user.entity';

@Entity('actividad')
export class Actividad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  titulo: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'text', nullable: true })
  instrucciones: string;

  @Column({ type: 'text', nullable: true })
  recursos_necesarios: string;

  @Column({ type: 'text', nullable: true })
  criterios_evaluacion: string;

  @Column({ length: 50, nullable: true })
  tipo_actividad: string;

  @Column({ type: 'datetime', nullable: true })
  fecha_inicio: Date;

  @Column({ type: 'datetime', nullable: true })
  fecha_fin: Date;

  @Column({ type: 'datetime' })
  fecha_limite_entrega: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  puntaje_maximo: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  peso_evaluativo: number;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_actualizacion: Date;

  // Foreign Keys
  @Column()
  asignatura_id: number;

  @Column()
  usuario_creador_id: number;

  @Column({ nullable: true })
  grupo_id: number;

  @Column({ nullable: true })
  periodo_academico_id: number;

  // Relationships
  @ManyToOne(() => Asignatura, (asignatura) => asignatura.actividades)
  @JoinColumn({ name: 'asignatura_id' })
  asignatura: Asignatura;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'usuario_creador_id' })
  usuario_creador: User;
}


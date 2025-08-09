import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Asignatura } from './asignatura.entity';
import { User } from './user.entity';

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

  @Column({
    type: 'enum',
    enum: [
      'Tarea',
      'Proyecto',
      'Examen',
      'Quiz',
      'Ensayo',
      'Presentación',
      'Laboratorio',
      'Investigación',
    ],
    default: 'Tarea',
  })
  tipo_actividad: string;

  @Column({ type: 'datetime', nullable: true })
  fecha_inicio: Date;

  @Column({ type: 'datetime', nullable: true })
  fecha_fin: Date;

  @Column({ type: 'datetime' })
  fecha_limite_entrega: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 100 })
  puntaje_maximo: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 1 })
  peso_evaluativo: number;

  @Column({ type: 'boolean', default: true })
  permite_entrega_tardia: boolean;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  penalizacion_tardanza: number;

  @Column({ type: 'int', default: 1 })
  intentos_maximos: number;

  @Column({ type: 'boolean', default: false })
  requiere_archivo: boolean;

  @Column({ type: 'text', nullable: true })
  formatos_permitidos: string;

  @Column({ type: 'int', nullable: true })
  tamaño_maximo_mb: number;

  @ManyToOne(() => Asignatura, { nullable: false })
  @JoinColumn({ name: 'asignatura_id' })
  asignatura: Asignatura;

  @Column()
  asignatura_id: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'usuario_creador_id' })
  usuario_creador: User;

  @Column()
  usuario_creador_id: number;

  @Column({ nullable: true })
  grupo_id: number;

  @Column({ nullable: true })
  periodo_academico_id: number;

  @Column({ nullable: true })
  estado_actividad_id: number;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_actualizacion: Date;

  // Virtual properties
  get esta_activa(): boolean {
    const now = new Date();
    return (
      (!this.fecha_inicio || this.fecha_inicio <= now) &&
      (!this.fecha_fin || this.fecha_fin >= now)
    );
  }

  get esta_vencida(): boolean {
    return new Date() > this.fecha_limite_entrega;
  }

  get dias_restantes(): number {
    const now = new Date();
    const diff = this.fecha_limite_entrega.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  }
}

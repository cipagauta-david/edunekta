import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { Grupo } from './grupo.entity';

@Entity('periodo_academico')
export class PeriodoAcademico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'institucion_id', type: 'int' })
  institucionId: number;

  @Column({ name: 'nombre', type: 'varchar', length: 50 })
  nombre: string;

  @Column({ name: 'estado', type: 'enum', enum: ['PLANIFICADO','EN_CURSO','FINALIZADO','ARCHIVADO'], default: 'PLANIFICADO' })
  estado: 'PLANIFICADO' | 'EN_CURSO' | 'FINALIZADO' | 'ARCHIVADO';

  @Column({ name: 'fecha_inicio', type: 'date' })
  fechaInicio: string;

  @Column({ name: 'fecha_fin', type: 'date' })
  fechaFin: string;

  // Relations
  @ManyToOne(() => Institucion, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'institucion_id' })
  institucion?: Institucion;

  @OneToMany(() => Grupo, (g) => g.periodoAcademico)
  grupos?: Grupo[];
}

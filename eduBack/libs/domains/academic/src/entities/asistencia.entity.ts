import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { Clase } from './clase.entity';
import { User } from '@app/domains/users';

@Entity('asistencia')
export class Asistencia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'institucion_id', type: 'int' })
  institucionId: number;

  @Column({ name: 'clase_id', type: 'int' })
  claseId: number;

  @Column({ name: 'estudiante_id', type: 'int' })
  estudianteId: number;

  @Column({ name: 'fecha', type: 'date' })
  fecha: string;

  @Column({ name: 'estado', type: 'enum', enum: ['PRESENTE','AUSENTE','TARDE','JUSTIFICADA'] })
  estado: 'PRESENTE'|'AUSENTE'|'TARDE'|'JUSTIFICADA';

  @Column({ name: 'observacion', type: 'varchar', length: 255, nullable: true })
  observacion?: string | null;

  // Relations
  @ManyToOne(() => Institucion, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'institucion_id' })
  institucion?: Institucion;

  @ManyToOne(() => Clase, (c) => c.asistencias, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'clase_id' })
  clase?: Clase;

  @ManyToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'estudiante_id' })
  estudiante?: User;
}

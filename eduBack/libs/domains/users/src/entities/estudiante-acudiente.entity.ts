import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { User } from './user.entity';

@Entity('estudiante_acudiente')
export class EstudianteAcudiente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'institucion_id', type: 'int' })
  institucionId: number;

  @Column({ name: 'estudiante_id', type: 'int' })
  estudianteId: number;

  @Column({ name: 'acudiente_id', type: 'int' })
  acudienteId: number;

  @Column({ name: 'parentesco', type: 'enum', enum: ['PADRE','MADRE','TUTOR','OTRO'] })
  parentesco: 'PADRE'|'MADRE'|'TUTOR'|'OTRO';

  // Relations
  @ManyToOne(() => Institucion, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'institucion_id' })
  institucion?: Institucion;

  @ManyToOne(() => User, (u) => u.acudientes, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'estudiante_id' })
  estudiante?: User;

  @ManyToOne(() => User, (u) => u.estudiantesACargo, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'acudiente_id' })
  acudiente?: User;
}

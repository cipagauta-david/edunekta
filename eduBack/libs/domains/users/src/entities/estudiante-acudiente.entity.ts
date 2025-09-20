import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// ... existing code ...
import { Institucion } from '@app/domains/institutions';
import { Usuario } from './usuario.entity';

@Index('fk_estacud_acu', ['acudienteId'], {})
@Index('fk_estacud_est', ['estudianteId'], {})
@Index('uq_est_acud', ['institucionId', 'estudianteId', 'acudienteId'], {
  unique: true,
})
@Entity('estudiante_acudiente', { schema: 'edunekta3' })
export class EstudianteAcudiente {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id' })
  institucionId: number;

  @Column('int', { name: 'estudiante_id' })
  estudianteId: number;

  @Column('int', { name: 'acudiente_id' })
  acudienteId: number;

  @Column('enum', {
    name: 'parentesco',
    enum: ['PADRE', 'MADRE', 'TUTOR', 'OTRO'],
  })
  parentesco: 'PADRE' | 'MADRE' | 'TUTOR' | 'OTRO';

  @ManyToOne(() => Usuario, (usuario) => usuario.estudianteAcudientes, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'acudiente_id', referencedColumnName: 'id' }])
  acudiente: Usuario;

  @ManyToOne(() => Usuario, (usuario) => usuario.estudianteAcudientes2, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'estudiante_id', referencedColumnName: 'id' }])
  estudiante: Usuario;

  @ManyToOne(
    () => Institucion,
    (institucion) => institucion.estudianteAcudientes,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;
}

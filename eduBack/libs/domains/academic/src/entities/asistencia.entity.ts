import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Clase } from '@app/domains/academic';
import { Usuario } from '@app/domains/users';
import { Institucion } from '@app/domains/institutions';

@Index('fk_asistencia_clase', ['claseId'], {})
@Index('fk_asistencia_est', ['estudianteId'], {})
@Index('uq_asistencia', ['institucionId', 'claseId', 'estudianteId', 'fecha'], {
  unique: true,
})
@Entity('asistencia', { schema: 'edunekta3' })
export class Asistencia {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id' })
  institucionId: number;

  @Column('int', { name: 'clase_id' })
  claseId: number;

  @Column('int', { name: 'estudiante_id' })
  estudianteId: number;

  @Column('date', { name: 'fecha' })
  fecha: string;

  @Column('enum', {
    name: 'estado',
    enum: ['PRESENTE', 'AUSENTE', 'TARDE', 'JUSTIFICADA'],
  })
  estado: 'PRESENTE' | 'AUSENTE' | 'TARDE' | 'JUSTIFICADA';

  @Column('varchar', { name: 'observacion', nullable: true, length: 255 })
  observacion: string | null;

  @ManyToOne(() => Clase, (clase) => clase.asistencias, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'clase_id', referencedColumnName: 'id' }])
  clase: Clase;

  @ManyToOne(() => Usuario, (usuario) => usuario.asistencias, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'estudiante_id', referencedColumnName: 'id' }])
  estudiante: Usuario;

  @ManyToOne(() => Institucion, (institucion) => institucion.asistencias, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;
}

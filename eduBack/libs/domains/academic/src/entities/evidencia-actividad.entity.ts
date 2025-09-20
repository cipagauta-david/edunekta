import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Actividad } from '@app/domains/academic';
import { Usuario } from '@app/domains/users';
import { Institucion } from '@app/domains/institutions';

@Index('fk_evidencia_actividad', ['actividadId'], {})
@Index('fk_evidencia_est', ['estudianteId'], {})
@Index('uq_evidencia', ['institucionId', 'actividadId', 'estudianteId'], {
  unique: true,
})
@Entity('evidencia_actividad', { schema: 'edunekta3' })
export class EvidenciaActividad {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id' })
  institucionId: number;

  @Column('int', { name: 'actividad_id' })
  actividadId: number;

  @Column('int', { name: 'estudiante_id' })
  estudianteId: number;

  @Column('text', { name: 'descripcion', nullable: true })
  descripcion: string | null;

  @Column('datetime', {
    name: 'fecha_subida',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaSubida: Date | null;

  @Column('decimal', {
    name: 'calificacion',
    nullable: true,
    precision: 5,
    scale: 2,
  })
  calificacion: string | null;

  @ManyToOne(() => Actividad, (actividad) => actividad.evidenciaActividads, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'actividad_id', referencedColumnName: 'id' }])
  actividad: Actividad;

  @ManyToOne(() => Usuario, (usuario) => usuario.evidenciaActividads, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'estudiante_id', referencedColumnName: 'id' }])
  estudiante: Usuario;

  @ManyToOne(
    () => Institucion,
    (institucion) => institucion.evidenciaActividads,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;
}

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Institucion } from '@app/domains/institutions';

@Index('idx_calendario_rango', ['institucionId', 'fechaInicio', 'fechaFin'], {})
@Entity('calendario_evento', { schema: 'edunekta3' })
export class CalendarioEvento {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id' })
  institucionId: number;

  @Column('varchar', { name: 'titulo', length: 255 })
  titulo: string;

  @Column('text', { name: 'descripcion', nullable: true })
  descripcion: string | null;

  @Column('datetime', { name: 'fecha_inicio' })
  fechaInicio: Date;

  @Column('datetime', { name: 'fecha_fin' })
  fechaFin: Date;

  @Column('enum', {
    name: 'tipo',
    enum: ['FERIADO', 'REUNION', 'ACADEMICO', 'CIVICO'],
  })
  tipo: 'FERIADO' | 'REUNION' | 'ACADEMICO' | 'CIVICO';

  @Column('datetime', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @ManyToOne(
    () => Institucion,
    (institucion) => institucion.calendarioEventos,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;
}

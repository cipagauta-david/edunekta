import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { DetalleFactura } from './detalle-factura.entity';

@Index('uq_concepto_nombre', ['institucionId', 'nombre'], { unique: true })
@Entity('concepto_facturacion', { schema: 'edunekta3' })
export class ConceptoFacturacion {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id' })
  institucionId: number;

  @Column('varchar', { name: 'nombre', length: 255 })
  nombre: string;

  @Column('text', { name: 'descripcion', nullable: true })
  descripcion: string | null;

  @Column('decimal', { name: 'costo_base', precision: 12, scale: 2 })
  costoBase: string;

  @Column('tinyint', {
    name: 'activo',
    nullable: true,
    width: 1,
    default: () => "'1'",
  })
  activo: boolean | null;

  @ManyToOne(
    () => Institucion,
    (institucion) => institucion.conceptoFacturacions,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;

  @OneToMany(
    () => DetalleFactura,
    (detalleFactura) => detalleFactura.conceptoFacturacion,
  )
  detalleFacturas: DetalleFactura[];
}

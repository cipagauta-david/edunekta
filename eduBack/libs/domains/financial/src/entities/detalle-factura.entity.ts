import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ConceptoFacturacion } from './concepto-facturacion.entity';
import { Factura } from './factura.entity';
import { Institucion } from '@app/domains/institutions';

@Index('fk_detalle_concepto', ['conceptoFacturacionId'], {})
@Index('fk_detalle_factura', ['facturaId'], {})
@Index('idx_detalle_factura', ['institucionId', 'facturaId'], {})
@Entity('detalle_factura', { schema: 'edunekta3' })
export class DetalleFactura {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id' })
  institucionId: number;

  @Column('int', { name: 'factura_id' })
  facturaId: number;

  @Column('int', { name: 'concepto_facturacion_id' })
  conceptoFacturacionId: number;

  @Column('varchar', {
    name: 'descripcion_adicional',
    nullable: true,
    length: 255,
  })
  descripcionAdicional: string | null;

  @Column('decimal', {
    name: 'cantidad',
    precision: 10,
    scale: 2,
    default: () => "'1.00'",
  })
  cantidad: string;

  @Column('decimal', { name: 'precio_unitario', precision: 12, scale: 2 })
  precioUnitario: string;

  @Column('decimal', { name: 'monto', precision: 12, scale: 2 })
  monto: string;

  @Column('datetime', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @ManyToOne(
    () => ConceptoFacturacion,
    (conceptoFacturacion) => conceptoFacturacion.detalleFacturas,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'concepto_facturacion_id', referencedColumnName: 'id' }])
  conceptoFacturacion: ConceptoFacturacion;

  @ManyToOne(() => Factura, (factura) => factura.detalleFacturas, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'factura_id', referencedColumnName: 'id' }])
  factura: Factura;

  @ManyToOne(() => Institucion, (institucion) => institucion.detalleFacturas, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;
}

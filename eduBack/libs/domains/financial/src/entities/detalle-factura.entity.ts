import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { ConceptoFacturacion } from './concepto-facturacion.entity';
import { Factura } from './factura.entity';

@Entity('detalle_factura')
export class DetalleFactura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'institucion_id', type: 'int' })
  institucionId: number;

  @Column({ name: 'factura_id', type: 'int' })
  facturaId: number;

  @Column({ name: 'concepto_facturacion_id', type: 'int' })
  conceptoFacturacionId: number;

  @Column({ name: 'descripcion_adicional', type: 'varchar', length: 255, nullable: true })
  descripcionAdicional?: string | null;

  @Column({ name: 'cantidad', type: 'decimal', precision: 10, scale: 2, default: 1.0 })
  cantidad: string;

  @Column({ name: 'precio_unitario', type: 'decimal', precision: 12, scale: 2 })
  precioUnitario: string;

  @Column({ name: 'monto', type: 'decimal', precision: 12, scale: 2 })
  monto: string;

  @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => Institucion, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'institucion_id' })
  institucion?: Institucion;

  @ManyToOne(() => Factura, (factura) => factura.detalles, { onDelete: 'CASCADE', createForeignKeyConstraints: false })
  @JoinColumn({ name: 'factura_id' })
  factura?: Factura;

  @ManyToOne(() => ConceptoFacturacion, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'concepto_facturacion_id' })
  concepto?: ConceptoFacturacion;
}

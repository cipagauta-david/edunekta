import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { Factura } from './factura.entity';

@Entity('pago')
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'institucion_id', type: 'int' })
  institucionId: number;

  @Column({ name: 'factura_id', type: 'int' })
  facturaId: number;

  @Column({ name: 'monto', type: 'decimal', precision: 12, scale: 2 })
  monto: string;

  @Column({ name: 'fecha_pago', type: 'datetime' })
  fechaPago: Date;

  @Column({ name: 'metodo', type: 'enum', enum: ['EFECTIVO','TRANSFERENCIA','TARJETA','PSE'] })
  metodo: 'EFECTIVO'|'TRANSFERENCIA'|'TARJETA'|'PSE';

  @Column({ name: 'referencia', type: 'varchar', length: 100, nullable: true })
  referencia?: string | null;

  @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => Institucion, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'institucion_id' })
  institucion?: Institucion;

  @ManyToOne(() => Factura, (f) => f.pagos, { onDelete: 'CASCADE', createForeignKeyConstraints: false })
  @JoinColumn({ name: 'factura_id' })
  factura?: Factura;
}

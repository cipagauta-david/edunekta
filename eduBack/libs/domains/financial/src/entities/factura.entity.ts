import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { User } from '@app/domains/users';
import { DetalleFactura } from './detalle-factura.entity';
import { Pago } from './pago.entity';

@Entity('factura')
export class Factura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'institucion_id', type: 'int' })
  institucionId: number;

  @Column({ name: 'acudiente_id', type: 'int' })
  acudienteId: number;

  @Column({ name: 'fecha_emision', type: 'date' })
  fechaEmision: string;

  @Column({ name: 'fecha_vencimiento', type: 'date' })
  fechaVencimiento: string;

  @Column({ name: 'total', type: 'decimal', precision: 12, scale: 2 })
  total: string;

  @Column({ name: 'estado', type: 'enum', enum: ['PENDIENTE','PARCIAL','PAGADA','VENCIDA','ANULADA'], default: 'PENDIENTE' })
  estado: 'PENDIENTE'|'PARCIAL'|'PAGADA'|'VENCIDA'|'ANULADA';

  @Column({ name: 'saldo_cache', type: 'decimal', precision: 13, scale: 2, default: 0 })
  saldoCache: string;

  @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Institucion, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'institucion_id' })
  institucion?: Institucion;

  @ManyToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'acudiente_id' })
  acudiente?: User;

  @OneToMany(() => DetalleFactura, (detalle) => detalle.factura)
  detalles?: DetalleFactura[];

  @OneToMany(() => Pago, (p) => p.factura)
  pagos?: Pago[];
}

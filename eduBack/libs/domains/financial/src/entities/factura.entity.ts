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
import { Pago } from './pago.entity';
import { DetalleFactura } from './detalle-factura.entity';
import { Usuario } from '@app/domains/users';

@Index('fk_factura_acud', ['acudienteId'], {})
@Index('fk_factura_inst', ['institucionId'], {})
@Entity('factura', { schema: 'edunekta3' })
export class Factura {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id' })
  institucionId: number;

  @Column('int', { name: 'acudiente_id' })
  acudienteId: number;

  @Column('date', { name: 'fecha_emision' })
  fechaEmision: string;

  @Column('date', { name: 'fecha_vencimiento' })
  fechaVencimiento: string;

  @Column('decimal', { name: 'total', precision: 12, scale: 2 })
  total: string;

  @Column('enum', {
    name: 'estado',
    enum: ['PENDIENTE', 'PARCIAL', 'PAGADA', 'VENCIDA', 'ANULADA'],
    default: () => "'PENDIENTE'",
  })
  estado: 'PENDIENTE' | 'PARCIAL' | 'PAGADA' | 'VENCIDA' | 'ANULADA';

  @Column('decimal', {
    name: 'saldo_cache',
    precision: 13,
    scale: 2,
    default: () => "'0.00'",
  })
  saldoCache: string;

  @Column('datetime', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @Column('datetime', {
    name: 'updated_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date | null;

  @OneToMany(() => DetalleFactura, (detalleFactura) => detalleFactura.factura)
  detalleFacturas: DetalleFactura[];

  @ManyToOne(() => Usuario, (usuario) => usuario.facturas, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'acudiente_id', referencedColumnName: 'id' }])
  acudiente: Usuario;

  @ManyToOne(() => Institucion, (institucion) => institucion.facturas, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;

  @OneToMany(() => Pago, (pago) => pago.factura)
  pagos: Pago[];
}

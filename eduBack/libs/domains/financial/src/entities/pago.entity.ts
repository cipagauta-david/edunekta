import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Factura } from './factura.entity';
import { Institucion } from '@app/domains/institutions';

@Index('fk_pago_factura', ['facturaId'], {})
@Index('idx_pago_factura', ['institucionId', 'facturaId', 'fechaPago'], {})
@Entity('pago', { schema: 'edunekta3' })
export class Pago {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id' })
  institucionId: number;

  @Column('int', { name: 'factura_id' })
  facturaId: number;

  @Column('decimal', { name: 'monto', precision: 12, scale: 2 })
  monto: string;

  @Column('datetime', { name: 'fecha_pago' })
  fechaPago: Date;

  @Column('enum', {
    name: 'metodo',
    enum: ['EFECTIVO', 'TRANSFERENCIA', 'TARJETA', 'PSE'],
  })
  metodo: 'EFECTIVO' | 'TRANSFERENCIA' | 'TARJETA' | 'PSE';

  @Column('varchar', { name: 'referencia', nullable: true, length: 100 })
  referencia: string | null;

  @Column('datetime', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @ManyToOne(() => Factura, (factura) => factura.pagos, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'factura_id', referencedColumnName: 'id' }])
  factura: Factura;

  @ManyToOne(() => Institucion, (institucion) => institucion.pagos, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;
}

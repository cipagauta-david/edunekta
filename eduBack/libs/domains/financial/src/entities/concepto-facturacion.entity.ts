import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('concepto_facturacion')
export class ConceptoFacturacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'institucion_id', type: 'int' })
  institucionId: number;

  @Column({ name: 'nombre', type: 'varchar', length: 255 })
  nombre: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion?: string | null;

  @Column({ name: 'costo_base', type: 'decimal', precision: 12, scale: 2 })
  costoBase: string;

  @Column({ name: 'activo', type: 'boolean', default: true })
  activo: boolean;
}

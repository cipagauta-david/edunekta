import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('institucion')
export class Institucion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nombre', type: 'varchar', length: 255 })
  nombre: string;

  @Column({ name: 'nit', type: 'varchar', length: 20, nullable: true, unique: true })
  nit?: string | null;

  @Column({ name: 'correo', type: 'varchar', length: 150, nullable: true })
  correo?: string | null;

  @Column({ name: 'telefono', type: 'varchar', length: 30, nullable: true })
  telefono?: string | null;

  @Column({ name: 'direccion', type: 'text', nullable: true })
  direccion?: string | null;

  @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

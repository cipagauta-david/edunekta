import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RolPermiso } from './rol-permiso.entity';

@Index('uq_permiso_slug', ['slug'], { unique: true })
@Entity('permiso', { schema: 'edunekta3' })
export class Permiso {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'nombre', length: 150 })
  nombre: string;

  @Column('varchar', { name: 'slug', unique: true, length: 150 })
  slug: string;

  @Column('varchar', { name: 'descripcion', nullable: true, length: 255 })
  descripcion: string | null;

  @Column('varchar', { name: 'recurso', nullable: true, length: 100 })
  recurso: string | null;

  @Column('varchar', { name: 'accion', nullable: true, length: 50 })
  accion: string | null;

  @Column('tinyint', { name: 'activo', width: 1, default: () => '1' })
  activo: boolean;

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

  @OneToMany(() => RolPermiso, (rolPermiso) => rolPermiso.permiso)
  rolPermisos: RolPermiso[];
}

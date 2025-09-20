import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RolPermiso } from './rol-permiso.entity';
import { UsuarioRol } from './usuario-rol.entity';

@Index('uq_rol_nombre', ['nombre'], { unique: true })
@Index('uq_rol_slug', ['slug'], { unique: true })
@Entity('rol', { schema: 'edunekta3' })
export class Rol {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'nombre', unique: true, length: 100 })
  nombre: string;

  @Column('varchar', { name: 'slug', unique: true, length: 100 })
  slug: string;

  @Column('varchar', { name: 'descripcion', nullable: true, length: 255 })
  descripcion: string | null;

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

  @OneToMany(() => RolPermiso, (rolPermiso) => rolPermiso.rol)
  rolPermisos: RolPermiso[];

  @OneToMany(() => UsuarioRol, (usuarioRol) => usuarioRol.rol)
  usuarioRols: UsuarioRol[];
}

import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Permiso } from './permiso.entity';
import { Rol } from './rol.entity';

@Index('idx_rolpermiso_permiso_id', ['permisoId'], {})
@Index('fk_rolpermiso_creado_por', ['creadoPor'], {})
@Entity('rol_permiso', { schema: 'edunekta3' })
export class RolPermiso {
  @Column('int', { primary: true, name: 'rol_id' })
  rolId: number;

  @Column('int', { primary: true, name: 'permiso_id' })
  permisoId: number;

  @Column('int', { name: 'creado_por', nullable: true })
  creadoPor: number | null;

  @Column('datetime', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @ManyToOne(() => Usuario, (usuario) => usuario.rolPermisos, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'creado_por', referencedColumnName: 'id' }])
  creadoPor2: Usuario;

  @ManyToOne(() => Permiso, (permiso) => permiso.rolPermisos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'permiso_id', referencedColumnName: 'id' }])
  permiso: Permiso;

  @ManyToOne(() => Rol, (rol) => rol.rolPermisos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'rol_id', referencedColumnName: 'id' }])
  rol: Rol;
}

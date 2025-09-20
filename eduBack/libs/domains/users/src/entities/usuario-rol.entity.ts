import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Rol } from './rol.entity';

@Index('idx_usuario_rol_rol_id', ['rolId'], {})
@Index('fk_usuariorol_asignado_por', ['asignadoPor'], {})
@Entity('usuario_rol', { schema: 'edunekta3' })
export class UsuarioRol {
  @Column('int', { primary: true, name: 'usuario_id' })
  usuarioId: number;

  @Column('int', { primary: true, name: 'rol_id' })
  rolId: number;

  @Column('int', { name: 'asignado_por', nullable: true })
  asignadoPor: number | null;

  @Column('datetime', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @ManyToOne(() => Usuario, (usuario) => usuario.usuarioRols, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'asignado_por', referencedColumnName: 'id' }])
  asignadoPor2: Usuario;

  @ManyToOne(() => Rol, (rol) => rol.usuarioRols, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'rol_id', referencedColumnName: 'id' }])
  rol: Rol;

  @ManyToOne(() => Usuario, (usuario) => usuario.usuarioRols, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'usuario_id', referencedColumnName: 'id' }])
  usuario: Usuario;
}

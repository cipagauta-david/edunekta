import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from '@app/domains/users';
// IMPORTANT: Use relative import to avoid circular dependency via barrel
import { Foro } from './foro.entity';
import { Institucion } from '@app/domains/institutions';

@Index('fk_cforo_autor', ['usuarioIdAutor'], {})
@Index('fk_cforo_inst', ['institucionId'], {})
@Index('fk_cforo_parent', ['parentId'], {})
@Index('idx_comentario_foro', ['foroId', 'createdAt'], {})
@Entity('comentario_foro', { schema: 'edunekta3' })
export class ComentarioForo {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id' })
  institucionId: number;

  @Column('int', { name: 'foro_id' })
  foroId: number;

  @Column('int', { name: 'usuario_id_autor' })
  usuarioIdAutor: number;

  @Column('text', { name: 'contenido' })
  contenido: string;

  @Column('int', { name: 'parent_id', nullable: true })
  parentId: number | null;

  @Column('datetime', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @ManyToOne(() => Usuario, (usuario) => usuario.comentarioForos, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'usuario_id_autor', referencedColumnName: 'id' }])
  usuarioIdAutor2: Usuario;

  @ManyToOne(() => Foro, (foro) => foro.comentarioForos, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'foro_id', referencedColumnName: 'id' }])
  foro: Foro;

  @ManyToOne(() => Institucion, (institucion) => institucion.comentarioForos, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;

  @ManyToOne(
    () => ComentarioForo,
    (comentarioForo) => comentarioForo.comentarioForos,
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'parent_id', referencedColumnName: 'id' }])
  parent: ComentarioForo;

  @OneToMany(() => ComentarioForo, (comentarioForo) => comentarioForo.parent)
  comentarioForos: ComentarioForo[];
}

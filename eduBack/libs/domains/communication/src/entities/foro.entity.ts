import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// IMPORTANT: Use relative import to avoid circular dependency via barrel
import { ComentarioForo } from './comentario-foro.entity';
import { Usuario } from '@app/domains/users';
import { Institucion } from '@app/domains/institutions';

@Index('fk_foro_autor', ['usuarioIdAutor'], {})
@Index('fk_foro_inst', ['institucionId'], {})
@Entity('foro', { schema: 'edunekta3' })
export class Foro {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id' })
  institucionId: number;

  @Column('varchar', { name: 'titulo', length: 255 })
  titulo: string;

  @Column('text', { name: 'descripcion', nullable: true })
  descripcion: string | null;

  @Column('int', { name: 'usuario_id_autor' })
  usuarioIdAutor: number;

  @Column('datetime', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @OneToMany(() => ComentarioForo, (comentarioForo) => comentarioForo.foro)
  comentarioForos: ComentarioForo[];

  @ManyToOne(() => Usuario, (usuario) => usuario.foros, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'usuario_id_autor', referencedColumnName: 'id' }])
  usuarioIdAutor2: Usuario;

  @ManyToOne(() => Institucion, (institucion) => institucion.foros, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;
}

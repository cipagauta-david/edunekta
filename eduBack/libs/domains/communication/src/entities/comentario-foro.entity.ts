import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { Foro } from './foro.entity';
import { User } from '@app/domains/users';

@Entity('comentario_foro')
export class ComentarioForo {
  [key: string]: any;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'institucion_id', type: 'int' })
  institucionId: number;

  @Column({ name: 'foro_id', type: 'int' })
  foroId: number;

  @Column({ name: 'usuario_id_autor', type: 'int' })
  usuarioIdAutor: number;

  @Column({ name: 'contenido', type: 'text' })
  contenido: string;

  @Column({ name: 'parent_id', type: 'int', nullable: true })
  parentId?: number | null;

  @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => Institucion, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'institucion_id' })
  institucion?: Institucion;

  @ManyToOne(() => Foro, (f) => f.comentarios, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'foro_id' })
  foro?: Foro;

  @ManyToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'usuario_id_autor' })
  autor?: User;

  @ManyToOne(() => ComentarioForo, { createForeignKeyConstraints: false, nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent?: ComentarioForo | null;
}

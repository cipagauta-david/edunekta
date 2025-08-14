import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { User } from '@app/domains/users';
import { ComentarioForo } from './comentario-foro.entity';

@Entity('foro')
export class Foro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'institucion_id', type: 'int' })
  institucionId: number;

  @Column({ name: 'titulo', type: 'varchar', length: 255 })
  titulo: string;

  @Column({ name: 'descripcion', type: 'text', nullable: true })
  descripcion?: string | null;

  @Column({ name: 'usuario_id_autor', type: 'int' })
  usuarioIdAutor: number;

  @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => Institucion, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'institucion_id' })
  institucion?: Institucion;

  @ManyToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'usuario_id_autor' })
  autor?: User;

  // Force TS to know the property exists on inverse side
  private static _rel(_: ComentarioForo) { return (_ as any).foro; }
  @OneToMany(() => ComentarioForo, (c) => Foro._rel(c))
  comentarios?: ComentarioForo[];
}

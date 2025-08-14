import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { UsuarioConversacion } from './usuario-conversacion.entity';
import { Mensaje } from './mensaje.entity';

@Entity('conversacion')
export class Conversacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'institucion_id', type: 'int' })
  institucionId: number;

  @Column({ name: 'estado', type: 'enum', enum: ['ACTIVA','ARCHIVADA'], default: 'ACTIVA' })
  estado: 'ACTIVA'|'ARCHIVADA';

  @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => Institucion, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'institucion_id' })
  institucion?: Institucion;

  @OneToMany(() => UsuarioConversacion, (uc) => uc.conversacion)
  usuarios?: UsuarioConversacion[];

  @OneToMany(() => Mensaje, (m) => m.conversacion)
  mensajes?: Mensaje[];
}

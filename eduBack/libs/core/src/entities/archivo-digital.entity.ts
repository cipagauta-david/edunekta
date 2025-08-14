import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Institucion } from '@app/domains/institutions';

@Entity('archivo_digital')
export class ArchivoDigital {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'institucion_id', type: 'int' })
  institucionId: number;

  @Column({ name: 'nombre', type: 'varchar', length: 255 })
  nombre: string;

  @Column({ name: 'url', type: 'text' })
  url: string;

  @Column({ name: 'tipo', type: 'enum', enum: ['DOCUMENTO','IMAGEN','VIDEO','AUDIO'] })
  tipo: 'DOCUMENTO'|'IMAGEN'|'VIDEO'|'AUDIO';

  @Column({ name: 'extension', type: 'varchar', length: 10, nullable: true })
  extension?: string | null;

  @Column({ name: 'propietario_id', type: 'int' })
  propietarioId: number;

  @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => Institucion, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'institucion_id' })
  institucion?: Institucion;
}

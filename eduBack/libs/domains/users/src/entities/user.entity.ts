import { Column, Entity, PrimaryGeneratedColumn, Index, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Institucion } from '@app/domains/institutions';
import { EstudianteAcudiente } from './estudiante-acudiente.entity';

export type Rol = 'ESTUDIANTE' | 'PROFESOR' | 'ACUDIENTE' | 'ADMIN';
export type Genero = 'M' | 'F' | 'O';
export type TipoDocumento = 'CC' | 'TI' | 'CE' | 'PP';

@Entity('usuario')
@Index('uq_usuario_institucion_email', ['institucionId', 'email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'institucion_id', type: 'int', nullable: true })
  institucionId: number | null;

  @Column({ name: 'nombre', length: 100 })
  nombre: string;

  @Column({ name: 'apellido', length: 100 })
  apellido: string;

  @Column({ name: 'email', length: 150 })
  email: string;

  @Column({ name: 'password_hash', length: 255 })
  passwordHash: string;

  @Column({ name: 'tipo_documento', type: 'enum', enum: ['CC', 'TI', 'CE', 'PP'], nullable: true })
  tipoDocumento?: TipoDocumento;

  @Column({ name: 'documento', type: 'varchar', length: 30, nullable: true })
  documento?: string;

  @Column({ name: 'genero', type: 'enum', enum: ['M', 'F', 'O'], nullable: true })
  genero?: Genero;

  @Column({ name: 'fecha_nacimiento', type: 'date', nullable: true })
  fechaNacimiento?: string | null;

  @Column({ name: 'telefono', type: 'varchar', length: 20, nullable: true })
  telefono?: string | null;

  @Column({ name: 'direccion', type: 'varchar', length: 200, nullable: true })
  direccion?: string | null;

  @Column({ name: 'rol', type: 'enum', enum: ['ESTUDIANTE', 'PROFESOR', 'ACUDIENTE', 'ADMIN'] })
  rol: Rol;

  @Column({ name: 'foto_perfil', type: 'varchar', length: 255, nullable: true })
  fotoPerfil?: string | null;

  @Column({ name: 'ultimo_acceso', type: 'datetime', nullable: true })
  ultimoAcceso?: Date | null;

  @Column({ name: 'activo', type: 'boolean', default: true })
  activo: boolean;

  @Column({ name: 'email_verificado', type: 'boolean', default: false })
  emailVerificado: boolean;

  @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Institucion, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'institucion_id' })
  institucion?: Institucion | null;

  @OneToMany(() => EstudianteAcudiente, (ea) => ea.estudiante)
  acudientes?: EstudianteAcudiente[];

  @OneToMany(() => EstudianteAcudiente, (ea) => ea.acudiente)
  estudiantesACargo?: EstudianteAcudiente[];
}

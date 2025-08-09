import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from './role.entity';

@Entity('usuario')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ unique: true, length: 150 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 20, nullable: true })
  documento: string;

  @Column({ type: 'enum', enum: ['CC', 'TI', 'CE', 'PP'], nullable: true })
  tipo_documento: string;

  @Column({ type: 'date', nullable: true })
  fecha_nacimiento: Date;

  @Column({ length: 20, nullable: true })
  telefono: string;

  @Column({ length: 200, nullable: true })
  direccion: string;

  @Column({ type: 'enum', enum: ['M', 'F', 'O'], nullable: true })
  genero: string;

  @Column({ length: 255, nullable: true })
  foto_perfil: string;

  @Column({ type: 'text', nullable: true })
  biografia: string;

  @Column({ type: 'datetime', nullable: true })
  ultimo_acceso: Date;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Column({ type: 'boolean', default: false })
  email_verificado: boolean;

  @Column({ length: 255, nullable: true })
  token_verificacion: string;

  @Column({ length: 255, nullable: true })
  token_recuperacion: string;

  @Column({ type: 'datetime', nullable: true })
  token_expiracion: Date;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_actualizacion: Date;

  // Relationships
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'usuario_rol',
    joinColumn: { name: 'usuario_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'rol_id', referencedColumnName: 'id' },
  })
  roles: Role[];

  // Virtual properties
  get nombre_completo(): string {
    return `${this.nombre} ${this.apellido}`;
  }

  get es_estudiante(): boolean {
    return this.roles?.some((role) => role.nombre === 'Estudiante') || false;
  }

  get es_profesor(): boolean {
    return this.roles?.some((role) => role.nombre === 'Profesor') || false;
  }

  get es_admin(): boolean {
    return this.roles?.some((role) => role.nombre === 'Administrador') || false;
  }
}

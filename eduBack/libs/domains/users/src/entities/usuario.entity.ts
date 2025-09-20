import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// Cross-domain entity imports
import {
  Asistencia,
  CalificacionPeriodo,
  Clase,
  Matricula,
  EvidenciaActividad,
} from '@app/domains/academic';
import {
  ComentarioForo,
  Foro,
  Mensaje,
  Notificacion,
  UsuarioConversacion,
} from '@app/domains/communication';
import { ArchivoDigital } from '@app/core';
import {
  EstudianteAcudiente,
  RolPermiso,
  UsuarioRol,
} from '@app/domains/users';
import { Factura } from '@app/domains/financial';
import { Institucion } from '@app/domains/institutions';

// Exported types used by DTOs
export type TipoDocumento = 'CC' | 'TI' | 'CE' | 'PP';
export type Genero = 'M' | 'F' | 'O';
@Index('idx_usuario_institucion', ['institucionId'], {})
@Index('uq_usuario_institucion_email', ['institucionId', 'email'], {
  unique: true,
})
@Entity('usuario', { schema: 'edunekta3' })
export class Usuario {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'institucion_id', nullable: true })
  institucionId: number | null;

  @Column('varchar', { name: 'nombre', length: 100 })
  nombre: string;

  @Column('varchar', { name: 'apellido', length: 100 })
  apellido: string;

  @Column('varchar', { name: 'email', length: 150 })
  email: string;

  @Column('varchar', { name: 'password_hash', length: 255 })
  passwordHash: string;

  @Column('enum', {
    name: 'tipo_documento',
    nullable: true,
    enum: ['CC', 'TI', 'CE', 'PP'],
  })
  tipoDocumento: TipoDocumento | null;

  @Column('varchar', { name: 'documento', nullable: true, length: 30 })
  documento: string | null;

  @Column('enum', { name: 'genero', nullable: true, enum: ['M', 'F', 'O'] })
  genero: Genero | null;

  @Column('date', { name: 'fecha_nacimiento', nullable: true })
  fechaNacimiento: string | null;

  @Column('varchar', { name: 'telefono', nullable: true, length: 20 })
  telefono: string | null;

  @Column('varchar', { name: 'direccion', nullable: true, length: 200 })
  direccion: string | null;

  @Column('varchar', { name: 'foto_perfil', nullable: true, length: 255 })
  fotoPerfil: string | null;

  @Column('datetime', { name: 'ultimo_acceso', nullable: true })
  ultimoAcceso: Date | null;

  @Column('tinyint', {
    name: 'activo',
    nullable: true,
    width: 1,
    default: () => "'1'",
  })
  activo: boolean | null;

  @Column('tinyint', {
    name: 'email_verificado',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  emailVerificado: boolean | null;

  @Column('datetime', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @Column('datetime', {
    name: 'updated_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date | null;

  @OneToMany(
    () => ArchivoDigital,
    (archivoDigital: ArchivoDigital) => archivoDigital.propietario,
  )
  archivoDigitals: ArchivoDigital[];

  @OneToMany(
    () => Asistencia,
    (asistencia: Asistencia) => asistencia.estudiante,
  )
  asistencias: Asistencia[];

  @OneToMany(
    () => CalificacionPeriodo,
    (calificacionPeriodo: CalificacionPeriodo) =>
      calificacionPeriodo.estudiante,
  )
  calificacionPeriodos: CalificacionPeriodo[];

  @OneToMany(() => Clase, (clase: Clase) => clase.profesor)
  clases: Clase[];

  @OneToMany(
    () => ComentarioForo,
    (comentarioForo: ComentarioForo) => comentarioForo.usuarioIdAutor2,
  )
  comentarioForos: ComentarioForo[];

  @OneToMany(
    () => EstudianteAcudiente,
    (estudianteAcudiente: EstudianteAcudiente) => estudianteAcudiente.acudiente,
  )
  estudianteAcudientes: EstudianteAcudiente[];

  @OneToMany(
    () => EstudianteAcudiente,
    (estudianteAcudiente: EstudianteAcudiente) =>
      estudianteAcudiente.estudiante,
  )
  estudianteAcudientes2: EstudianteAcudiente[];

  @OneToMany(
    () => EvidenciaActividad,
    (evidenciaActividad: EvidenciaActividad) => evidenciaActividad.estudiante,
  )
  evidenciaActividads: EvidenciaActividad[];

  @OneToMany(() => Factura, (factura: Factura) => factura.acudiente)
  facturas: Factura[];

  @OneToMany(() => Foro, (foro: Foro) => foro.usuarioIdAutor2)
  foros: Foro[];

  @OneToMany(() => Matricula, (matricula: Matricula) => matricula.estudiante)
  matriculas: Matricula[];

  @OneToMany(() => Mensaje, (mensaje: Mensaje) => mensaje.usuarioIdRemitente2)
  mensajes: Mensaje[];

  @OneToMany(
    () => Notificacion,
    (notificacion: Notificacion) => notificacion.usuario,
  )
  notificacions: Notificacion[];

  @OneToMany(() => RolPermiso, (rolPermiso: RolPermiso) => rolPermiso.creadoPor)
  rolPermisos: RolPermiso[];

  @ManyToOne(
    () => Institucion,
    (institucion: Institucion) => institucion.usuarios,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    },
  )
  @JoinColumn([{ name: 'institucion_id', referencedColumnName: 'id' }])
  institucion: Institucion;

  @OneToMany(
    () => UsuarioConversacion,
    (usuarioConversacion: UsuarioConversacion) => usuarioConversacion.usuario,
  )
  usuarioConversacions: UsuarioConversacion[];

  @OneToMany(
    () => UsuarioRol,
    (usuarioRol: UsuarioRol) => usuarioRol.asignadoPor,
  )
  usuarioRols: UsuarioRol[];

  @OneToMany(() => UsuarioRol, (usuarioRol: UsuarioRol) => usuarioRol.usuario)
  usuarioRols2: UsuarioRol[];

  @OneToMany(() => UsuarioRol, (usuarioRol: UsuarioRol) => usuarioRol.usuario)
  usuarioRols3: UsuarioRol[];
}

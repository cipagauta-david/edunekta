import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  Actividad,
  Asignatura,
  Asistencia,
  Aula,
  CalificacionPeriodo,
  Clase,
  Grado,
  Grupo,
  Matricula,
  NivelAcademico,
  PeriodoAcademico,
  PonderacionEvaluacion,
  EvidenciaActividad,
} from '@app/domains/academic';
import {
  ComentarioForo,
  Conversacion,
  Foro,
  Mensaje,
  UsuarioConversacion,
  CalendarioEvento,
} from '@app/domains/communication';
import { Notificacion } from '@app/domains/communication';

import {
  ConceptoFacturacion,
  DetalleFactura,
  Factura,
  Pago,
} from '@app/domains/financial';
import { Usuario, EstudianteAcudiente } from '@app/domains/users';
import { ArchivoDigital } from '@app/core';

@Index('nit', ['nit'], { unique: true })
@Index('uq_institucion_nombre', ['nombre'], { unique: true })
@Entity('institucion', { schema: 'edunekta3' })
export class Institucion {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'nombre', unique: true, length: 255 })
  nombre: string;

  @Column('varchar', { name: 'nit', nullable: true, unique: true, length: 20 })
  nit: string | null;

  @Column('varchar', { name: 'correo', nullable: true, length: 150 })
  correo: string | null;

  @Column('varchar', { name: 'telefono', nullable: true, length: 30 })
  telefono: string | null;

  @Column('text', { name: 'direccion', nullable: true })
  direccion: string | null;

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

  @OneToMany(() => Actividad, (actividad: Actividad) => actividad.institucion)
  actividads: Actividad[];

  @OneToMany(
    () => ArchivoDigital,
    (archivoDigital: ArchivoDigital) => archivoDigital.institucion,
  )
  archivoDigitals: ArchivoDigital[];

  @OneToMany(
    () => Asignatura,
    (asignatura: Asignatura) => asignatura.institucion,
  )
  asignaturas: Asignatura[];

  @OneToMany(
    () => Asistencia,
    (asistencia: Asistencia) => asistencia.institucion,
  )
  asistencias: Asistencia[];

  @OneToMany(() => Aula, (aula: Aula) => aula.institucion)
  aulas: Aula[];

  @OneToMany(
    () => CalendarioEvento,
    (calendarioEvento: CalendarioEvento) => calendarioEvento.institucion,
  )
  calendarioEventos: CalendarioEvento[];

  @OneToMany(
    () => CalificacionPeriodo,
    (calificacionPeriodo: CalificacionPeriodo) =>
      calificacionPeriodo.institucion,
  )
  calificacionPeriodos: CalificacionPeriodo[];

  @OneToMany(() => Clase, (clase: Clase) => clase.institucion)
  clases: Clase[];

  @OneToMany(
    () => ComentarioForo,
    (comentarioForo: ComentarioForo) => comentarioForo.institucion,
  )
  comentarioForos: ComentarioForo[];

  @OneToMany(
    () => ConceptoFacturacion,
    (conceptoFacturacion: ConceptoFacturacion) =>
      conceptoFacturacion.institucion,
  )
  conceptoFacturacions: ConceptoFacturacion[];

  @OneToMany(
    () => Conversacion,
    (conversacion: Conversacion) => conversacion.institucion,
  )
  conversacions: Conversacion[];

  @OneToMany(
    () => DetalleFactura,
    (detalleFactura: DetalleFactura) => detalleFactura.institucion,
  )
  detalleFacturas: DetalleFactura[];

  @OneToMany(
    () => EstudianteAcudiente,
    (estudianteAcudiente: EstudianteAcudiente) =>
      estudianteAcudiente.institucion,
  )
  estudianteAcudientes: EstudianteAcudiente[];

  @OneToMany(
    () => EvidenciaActividad,
    (evidenciaActividad: EvidenciaActividad) => evidenciaActividad.institucion,
  )
  evidenciaActividads: EvidenciaActividad[];

  @OneToMany(() => Factura, (factura: Factura) => factura.institucion)
  facturas: Factura[];

  @OneToMany(() => Foro, (foro: Foro) => foro.institucion)
  foros: Foro[];

  @OneToMany(() => Grado, (grado: Grado) => grado.institucion)
  grados: Grado[];

  @OneToMany(() => Grupo, (grupo: Grupo) => grupo.institucion)
  grupos: Grupo[];

  @OneToMany(() => Matricula, (matricula: Matricula) => matricula.institucion)
  matriculas: Matricula[];

  @OneToMany(() => Mensaje, (mensaje: Mensaje) => mensaje.institucion)
  mensajes: Mensaje[];

  @OneToMany(
    () => NivelAcademico,
    (nivelAcademico: NivelAcademico) => nivelAcademico.institucion,
  )
  nivelAcademicos: NivelAcademico[];

  @OneToMany(
    () => Notificacion,
    (notificacion: Notificacion) => notificacion.institucion,
  )
  notificacions: Notificacion[];

  @OneToMany(() => Pago, (pago: Pago) => pago.institucion)
  pagos: Pago[];

  @OneToMany(
    () => PeriodoAcademico,
    (periodoAcademico: PeriodoAcademico) => periodoAcademico.institucion,
  )
  periodoAcademicos: PeriodoAcademico[];

  @OneToMany(
    () => PonderacionEvaluacion,
    (ponderacionEvaluacion: PonderacionEvaluacion) =>
      ponderacionEvaluacion.institucion,
  )
  ponderacionEvaluacions: PonderacionEvaluacion[];

  @OneToMany(() => Usuario, (usuario: Usuario) => usuario.institucion)
  usuarios: Usuario[];

  @OneToMany(
    () => UsuarioConversacion,
    (usuarioConversacion: UsuarioConversacion) =>
      usuarioConversacion.institucion,
  )
  usuarioConversacions: UsuarioConversacion[];
}

export type EstadoActividad = 'PUBLICADA'|'CERRADA'|'CALIFICADA';
export type CategoriaActividad = 'TAREA'|'EXAMEN'|'PROYECTO'|'PARTICIPACION';

export interface ActividadModel {
  id: number;
  institucionId: number;
  titulo: string;
  descripcion?: string | null;
  fechaEntrega?: Date | null;
  claseId: number;
  estado: EstadoActividad;
  categoria: CategoriaActividad;
  createdAt: Date;
  updatedAt: Date;
}

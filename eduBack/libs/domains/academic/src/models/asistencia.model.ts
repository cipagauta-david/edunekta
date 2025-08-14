export type EstadoAsistencia = 'PRESENTE'|'AUSENTE'|'TARDE'|'JUSTIFICADA';

export interface AsistenciaModel {
  id: number;
  institucionId: number;
  claseId: number;
  estudianteId: number;
  fecha: string; // date
  estado: EstadoAsistencia;
  observacion?: string | null;
}

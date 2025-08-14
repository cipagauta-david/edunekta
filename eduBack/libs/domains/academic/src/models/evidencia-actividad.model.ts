export interface EvidenciaActividadModel {
  id: number;
  institucionId: number;
  actividadId: number;
  estudianteId: number;
  descripcion?: string | null;
  fechaSubida: Date;
  calificacion?: string | null; // decimal as string
}

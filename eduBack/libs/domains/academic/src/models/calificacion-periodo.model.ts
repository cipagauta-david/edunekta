export interface CalificacionPeriodoModel {
  id: number;
  institucionId: number;
  estudianteId: number;
  asignaturaId: number;
  periodoAcademicoId: number;
  notaFinal: string; // decimal as string
  observaciones?: string | null;
}

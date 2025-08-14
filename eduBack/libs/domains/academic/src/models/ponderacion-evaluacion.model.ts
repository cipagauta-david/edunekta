export type CategoriaPonderacion = 'TAREA'|'EXAMEN'|'PROYECTO'|'PARTICIPACION';

export interface PonderacionEvaluacionModel {
  id: number;
  institucionId: number;
  claseId: number;
  categoria: CategoriaPonderacion;
  porcentaje: string; // decimal as string
}

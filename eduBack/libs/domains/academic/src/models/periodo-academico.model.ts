export type EstadoPeriodo = 'PLANIFICADO' | 'EN_CURSO' | 'FINALIZADO' | 'ARCHIVADO';

export interface PeriodoAcademicoModel {
  id: number;
  institucionId: number;
  nombre: string;
  estado: EstadoPeriodo;
  fechaInicio: string; // date
  fechaFin: string;    // date
}

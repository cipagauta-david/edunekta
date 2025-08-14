export type DiaSemana = 'Lunes'|'Martes'|'Miércoles'|'Jueves'|'Viernes'|'Sábado';

export interface ClaseModel {
  id: number;
  institucionId: number;
  nombre?: string | null;
  dia: DiaSemana;
  horaInicio: string; // time
  horaFin: string;    // time
  grupoId: number;
  periodoAcademicoId: number;
  aulaId: number;
  asignaturaId: number;
  profesorId: number;
  createdAt: Date;
  updatedAt: Date;
}

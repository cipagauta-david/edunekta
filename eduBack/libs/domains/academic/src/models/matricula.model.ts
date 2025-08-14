export interface MatriculaModel {
  id: number;
  institucionId: number;
  estudianteId: number;
  gradoId: number;
  grupoId: number;
  periodoAcademicoId: number;
  estado: 'ACTIVA'|'RETIRADO'|'FINALIZADA'|'PENDIENTE';
  fechaMatricula: string; // date
}

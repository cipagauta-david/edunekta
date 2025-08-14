export interface GrupoModel {
  id: number;
  institucionId: number;
  gradoId: number;
  periodoAcademicoId: number;
  nombre: string;
  descripcion?: string | null;
}

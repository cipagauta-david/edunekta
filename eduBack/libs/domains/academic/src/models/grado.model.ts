export interface GradoModel {
  id: number;
  institucionId: number;
  nivelAcademicoId: number;
  nombre: string;
  descripcion?: string | null;
}

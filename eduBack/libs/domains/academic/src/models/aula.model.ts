export interface AulaModel {
  id: number;
  institucionId: number;
  nombre: string;
  capacidad?: number | null;
  ubicacion?: string | null;
}

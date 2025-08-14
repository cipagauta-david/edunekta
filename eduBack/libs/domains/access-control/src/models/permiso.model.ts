export interface PermisoModel {
  id: number;
  nombre: string;
  descripcion?: string | null;
  modulo?: string | null;
  activo: boolean;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
}

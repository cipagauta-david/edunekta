import type { PermisoModel } from './permiso.model';

export interface RoleModel {
  id: number;
  nombre: string;
  descripcion?: string | null;
  permisos?: PermisoModel[];
}

export interface CreateUserDto {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  documento?: string;
  tipo_documento?: string;
  fecha_nacimiento?: Date;
  telefono?: string;
  direccion?: string;
  genero?: string;
  roleIds?: number[];
}

export interface UpdateUserDto {
  nombre?: string;
  apellido?: string;
  email?: string;
  documento?: string;
  tipo_documento?: string;
  fecha_nacimiento?: Date;
  telefono?: string;
  direccion?: string;
  genero?: string;
  activo?: boolean;
  roleIds?: number[];
}

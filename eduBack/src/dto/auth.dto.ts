export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  documento?: string;
  tipo_documento?: string;
}

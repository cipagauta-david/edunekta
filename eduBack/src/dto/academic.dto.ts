export interface CreateActividadDto {
  titulo: string;
  descripcion: string;
  instrucciones?: string;
  recursos_necesarios?: string;
  criterios_evaluacion?: string;
  tipo_actividad?: string;
  fecha_inicio?: Date;
  fecha_fin?: Date;
  fecha_limite_entrega: Date;
  puntaje_maximo?: number;
  peso_evaluativo?: number;
  asignatura_id: number;
  usuario_creador_id: number;
  grupo_id?: number;
  periodo_academico_id?: number;
}

export interface CreateAsignaturaDto {
  nombre: string;
  codigo: string;
  descripcion?: string;
  creditos?: number;
  horas_semanales?: number;
  tipo_asignatura?: string;
  objetivos?: string;
  contenido_programatico?: string;
  metodologia?: string;
  recursos_necesarios?: string;
  bibliografia?: string;
  nivel_academico_id?: number;
}

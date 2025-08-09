import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Asignatura } from '../entities/asignatura.entity';

/**
 * Repositorio personalizado para asignaturas
 * Extiende el repositorio base con consultas específicas
 */
@Injectable()
export class SubjectRepository extends Repository<Asignatura> {
  constructor(private dataSource: DataSource) {
    super(Asignatura, dataSource.createEntityManager());
  }

  /**
   * Buscar asignaturas por grado con estadísticas
   * @param grado - Grado académico
   * @returns Asignaturas con estadísticas
   */
  async findByGradeWithStats(grado: number): Promise<any[]> {
    return this.createQueryBuilder('subject')
      .leftJoinAndSelect('subject.actividades', 'activity')
      .leftJoinAndSelect('subject.matriculas', 'enrollment')
      .leftJoinAndSelect('enrollment.usuario', 'student')
      .where('subject.grado = :grado', { grado })
      .andWhere('subject.estado = :estado', { estado: true })
      .select([
        'subject.id',
        'subject.nombre',
        'subject.descripcion',
        'subject.intensidad_horaria',
        'COUNT(DISTINCT activity.id) as totalActivities',
        'COUNT(DISTINCT enrollment.id) as totalStudents',
      ])
      .groupBy('subject.id')
      .getRawMany();
  }

  /**
   * Buscar asignaturas por profesor
   * @param teacherId - ID del profesor
   * @returns Asignaturas del profesor
   */
  async findByTeacher(teacherId: number): Promise<Asignatura[]> {
    return this.createQueryBuilder('subject')
      .leftJoinAndSelect('subject.actividades', 'activity')
      .where('subject.profesor_id = :teacherId', { teacherId })
      .andWhere('subject.estado = :estado', { estado: true })
      .orderBy('subject.nombre', 'ASC')
      .getMany();
  }

  /**
   * Buscar asignaturas con mayor número de estudiantes
   * @param limit - Límite de resultados
   * @returns Asignaturas más populares
   */
  async findMostPopular(limit: number = 10): Promise<any[]> {
    return this.createQueryBuilder('subject')
      .leftJoin('subject.matriculas', 'enrollment')
      .where('subject.estado = :estado', { estado: true })
      .select([
        'subject.id',
        'subject.nombre',
        'subject.grado',
        'COUNT(enrollment.id) as studentCount',
      ])
      .groupBy('subject.id')
      .orderBy('studentCount', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  /**
   * Buscar asignaturas por área de conocimiento
   * @param area - Área de conocimiento
   * @returns Asignaturas del área
   */
  async findByArea(area: string): Promise<Asignatura[]> {
    return this.createQueryBuilder('subject')
      .where('subject.area = :area', { area })
      .andWhere('subject.estado = :estado', { estado: true })
      .orderBy('subject.grado', 'ASC')
      .addOrderBy('subject.nombre', 'ASC')
      .getMany();
  }

  /**
   * Obtener estadísticas generales de asignaturas
   * @returns Estadísticas generales
   */
  async getGeneralStats(): Promise<any> {
    const stats = await this.createQueryBuilder('subject')
      .leftJoin('subject.matriculas', 'enrollment')
      .leftJoin('subject.actividades', 'activity')
      .select([
        'COUNT(DISTINCT subject.id) as totalSubjects',
        'COUNT(DISTINCT enrollment.id) as totalEnrollments',
        'COUNT(DISTINCT activity.id) as totalActivities',
        'AVG(subject.intensidad_horaria) as avgIntensity',
      ])
      .where('subject.estado = :estado', { estado: true })
      .getRawOne();

    return {
      totalSubjects: parseInt(stats.totalSubjects) || 0,
      totalEnrollments: parseInt(stats.totalEnrollments) || 0,
      totalActivities: parseInt(stats.totalActivities) || 0,
      avgIntensity: parseFloat(stats.avgIntensity) || 0,
    };
  }

  /**
   * Buscar asignaturas con actividades pendientes
   * @param studentId - ID del estudiante
   * @returns Asignaturas con actividades pendientes
   */
  async findWithPendingActivities(studentId: number): Promise<any[]> {
    return this.createQueryBuilder('subject')
      .leftJoin('subject.matriculas', 'enrollment')
      .leftJoin('subject.actividades', 'activity')
      .leftJoin('activity.evidencias', 'evidence', 'evidence.usuario_id = :studentId', { studentId })
      .where('enrollment.usuario_id = :studentId', { studentId })
      .andWhere('activity.fecha_limite > :now', { now: new Date() })
      .andWhere('evidence.id IS NULL') // No tiene evidencia entregada
      .select([
        'subject.id',
        'subject.nombre',
        'COUNT(activity.id) as pendingActivities',
      ])
      .groupBy('subject.id')
      .having('pendingActivities > 0')
      .getRawMany();
  }
}


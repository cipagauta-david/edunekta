import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { User } from '../entities/user.entity';

/**
 * Repositorio personalizado para usuarios
 * Extiende el repositorio base con consultas específicas
 */
@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  /**
   * Buscar usuario por email con roles
   * @param email - Email del usuario
   * @returns Usuario con roles
   */
  async findByEmailWithRoles(email: string): Promise<User | null> {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .leftJoinAndSelect('role.permisos', 'permission')
      .where('user.email = :email', { email })
      .andWhere('user.estado = :estado', { estado: true })
      .getOne();
  }

  /**
   * Buscar usuarios por rol
   * @param roleName - Nombre del rol
   * @returns Lista de usuarios
   */
  async findByRole(roleName: string): Promise<User[]> {
    return this.createQueryBuilder('user')
      .leftJoin('user.roles', 'role')
      .where('role.nombre = :roleName', { roleName })
      .andWhere('user.estado = :estado', { estado: true })
      .orderBy('user.nombre', 'ASC')
      .getMany();
  }

  /**
   * Buscar estudiantes por grado
   * @param grado - Grado académico
   * @returns Lista de estudiantes
   */
  async findStudentsByGrade(grado: number): Promise<User[]> {
    return this.createQueryBuilder('user')
      .leftJoin('user.roles', 'role')
      .leftJoin('user.matriculas', 'enrollment')
      .leftJoin('enrollment.grupo', 'group')
      .where('role.nombre = :role', { role: 'student' })
      .andWhere('group.grado = :grado', { grado })
      .andWhere('user.estado = :estado', { estado: true })
      .orderBy('user.apellido', 'ASC')
      .addOrderBy('user.nombre', 'ASC')
      .getMany();
  }

  /**
   * Buscar profesores con sus asignaturas
   * @returns Lista de profesores
   */
  async findTeachersWithSubjects(): Promise<any[]> {
    return this.createQueryBuilder('user')
      .leftJoin('user.roles', 'role')
      .leftJoinAndSelect('user.asignaturas', 'subject')
      .where('role.nombre = :role', { role: 'teacher' })
      .andWhere('user.estado = :estado', { estado: true })
      .select([
        'user.id',
        'user.nombre',
        'user.apellido',
        'user.email',
        'subject.id',
        'subject.nombre',
        'subject.grado',
      ])
      .orderBy('user.apellido', 'ASC')
      .getMany();
  }

  /**
   * Obtener estadísticas de usuarios
   * @returns Estadísticas generales
   */
  async getUserStats(): Promise<any> {
    const stats = await this.createQueryBuilder('user')
      .leftJoin('user.roles', 'role')
      .select([
        'COUNT(DISTINCT user.id) as totalUsers',
        'COUNT(DISTINCT CASE WHEN role.nombre = "student" THEN user.id END) as totalStudents',
        'COUNT(DISTINCT CASE WHEN role.nombre = "teacher" THEN user.id END) as totalTeachers',
        'COUNT(DISTINCT CASE WHEN role.nombre = "parent" THEN user.id END) as totalParents',
        'COUNT(DISTINCT CASE WHEN role.nombre = "admin" THEN user.id END) as totalAdmins',
      ])
      .where('user.estado = :estado', { estado: true })
      .getRawOne();

    return {
      totalUsers: parseInt(stats.totalUsers) || 0,
      totalStudents: parseInt(stats.totalStudents) || 0,
      totalTeachers: parseInt(stats.totalTeachers) || 0,
      totalParents: parseInt(stats.totalParents) || 0,
      totalAdmins: parseInt(stats.totalAdmins) || 0,
    };
  }

  /**
   * Buscar usuarios activos en los últimos días
   * @param days - Número de días
   * @returns Lista de usuarios activos
   */
  async findActiveUsers(days: number = 30): Promise<User[]> {
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - days);

    return this.createQueryBuilder('user')
      .where('user.ultimo_acceso >= :dateLimit', { dateLimit })
      .andWhere('user.estado = :estado', { estado: true })
      .orderBy('user.ultimo_acceso', 'DESC')
      .getMany();
  }

  /**
   * Buscar usuarios por término de búsqueda
   * @param searchTerm - Término de búsqueda
   * @returns Lista de usuarios
   */
  async searchUsers(searchTerm: string): Promise<User[]> {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .where(
        '(user.nombre LIKE :search OR user.apellido LIKE :search OR user.email LIKE :search OR user.documento LIKE :search)',
        { search: `%${searchTerm}%` }
      )
      .andWhere('user.estado = :estado', { estado: true })
      .orderBy('user.apellido', 'ASC')
      .addOrderBy('user.nombre', 'ASC')
      .getMany();
  }

  /**
   * Obtener usuarios con cumpleaños próximos
   * @param days - Días hacia adelante
   * @returns Lista de usuarios
   */
  async findUpcomingBirthdays(days: number = 7): Promise<User[]> {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);

    return this.createQueryBuilder('user')
      .where(
        'DATE_FORMAT(user.fecha_nacimiento, "%m-%d") BETWEEN DATE_FORMAT(:today, "%m-%d") AND DATE_FORMAT(:futureDate, "%m-%d")',
        { today, futureDate }
      )
      .andWhere('user.estado = :estado', { estado: true })
      .orderBy('DATE_FORMAT(user.fecha_nacimiento, "%m-%d")', 'ASC')
      .getMany();
  }

  /**
   * Verificar si el email ya existe
   * @param email - Email a verificar
   * @param excludeId - ID a excluir (para actualizaciones)
   * @returns True si existe, false si no
   */
  async emailExists(email: string, excludeId?: number): Promise<boolean> {
    const query = this.createQueryBuilder('user')
      .where('user.email = :email', { email });

    if (excludeId) {
      query.andWhere('user.id != :excludeId', { excludeId });
    }

    const count = await query.getCount();
    return count > 0;
  }

  /**
   * Verificar si el documento ya existe
   * @param documento - Documento a verificar
   * @param excludeId - ID a excluir (para actualizaciones)
   * @returns True si existe, false si no
   */
  async documentExists(documento: string, excludeId?: number): Promise<boolean> {
    const query = this.createQueryBuilder('user')
      .where('user.documento = :documento', { documento });

    if (excludeId) {
      query.andWhere('user.id != :excludeId', { excludeId });
    }

    const count = await query.getCount();
    return count > 0;
  }
}


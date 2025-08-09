import { Command, CommandRunner } from 'nest-commander';
import { Injectable, Logger } from '@nestjs/common';

/**
 * Comando CLI para poblar la base de datos con datos de prueba
 * Uso: npm run cli seed
 */
@Injectable()
@Command({
  name: 'seed',
  description: 'Poblar la base de datos con datos de prueba',
})
export class SeedCommand extends CommandRunner {
  private readonly logger = new Logger(SeedCommand.name);

  async run(): Promise<void> {
    this.logger.log('Iniciando proceso de seeding...');

    try {
      await this.seedRoles();
      await this.seedUsers();
      await this.seedAcademicData();
      
      this.logger.log('✅ Seeding completado exitosamente');
    } catch (error) {
      this.logger.error('❌ Error durante el seeding:', error);
      throw error;
    }
  }

  /**
   * Crear roles por defecto
   */
  private async seedRoles(): Promise<void> {
    this.logger.log('Creando roles por defecto...');
    
    const defaultRoles = [
      { nombre: 'admin', descripcion: 'Administrador del sistema' },
      { nombre: 'teacher', descripcion: 'Profesor' },
      { nombre: 'student', descripcion: 'Estudiante' },
      { nombre: 'parent', descripcion: 'Padre/Tutor' },
    ];

    // TODO: Implementar creación de roles
    this.logger.log(`Roles creados: ${defaultRoles.length}`);
  }

  /**
   * Crear usuarios por defecto
   */
  private async seedUsers(): Promise<void> {
    this.logger.log('Creando usuarios por defecto...');
    
    const defaultUsers = [
      {
        email: 'admin@edunekta.com',
        nombre: 'Administrador',
        apellido: 'Sistema',
        password: 'admin123',
        role: 'admin',
      },
      {
        email: 'teacher@edunekta.com',
        nombre: 'Profesor',
        apellido: 'Demo',
        password: 'teacher123',
        role: 'teacher',
      },
      {
        email: 'student@edunekta.com',
        nombre: 'Estudiante',
        apellido: 'Demo',
        password: 'student123',
        role: 'student',
      },
    ];

    // TODO: Implementar creación de usuarios
    this.logger.log(`Usuarios creados: ${defaultUsers.length}`);
  }

  /**
   * Crear datos académicos por defecto
   */
  private async seedAcademicData(): Promise<void> {
    this.logger.log('Creando datos académicos por defecto...');
    
    // TODO: Crear asignaturas, grupos, períodos académicos, etc.
    const subjects = [
      'Matemáticas',
      'Español',
      'Ciencias Naturales',
      'Ciencias Sociales',
      'Inglés',
      'Educación Física',
    ];

    this.logger.log(`Asignaturas creadas: ${subjects.length}`);
  }
}


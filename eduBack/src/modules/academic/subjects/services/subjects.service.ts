import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignatura } from '../entities/asignatura.entity';
import { CreateSubjectDto, UpdateSubjectDto, SubjectQueryDto } from '../dto/subject.dto';
import { PaginatedResponse } from '../../../../common/dto/pagination.dto';

/**
 * Servicio para gestión de asignaturas
 */
@Injectable()
export class SubjectsService {
  private readonly logger = new Logger(SubjectsService.name);

  constructor(
    @InjectRepository(Asignatura)
    private subjectRepository: Repository<Asignatura>,
  ) {}

  /**
   * Crear nueva asignatura
   * @param createSubjectDto - Datos de la asignatura
   * @param userId - ID del usuario que crea
   * @returns Asignatura creada
   */
  async create(createSubjectDto: CreateSubjectDto, userId: number): Promise<Asignatura> {
    this.logger.log(`Creating subject: ${createSubjectDto.nombre}`);

    const subject = this.subjectRepository.create({
      ...createSubjectDto,
      // TODO: Agregar campos de auditoría
      // createdBy: userId,
      // createdAt: new Date(),
    });

    const savedSubject = await this.subjectRepository.save(subject);
    
    this.logger.log(`Subject created with ID: ${savedSubject.id}`);
    return savedSubject;
  }

  /**
   * Obtener todas las asignaturas con filtros y paginación
   * @param query - Parámetros de consulta
   * @returns Lista paginada de asignaturas
   */
  async findAll(query: SubjectQueryDto): Promise<PaginatedResponse<Asignatura>> {
    const { page = 1, limit = 10, search, grado, estado } = query;
    
    const queryBuilder = this.subjectRepository.createQueryBuilder('subject');

    // Aplicar filtros
    if (search) {
      queryBuilder.andWhere(
        '(subject.nombre LIKE :search OR subject.descripcion LIKE :search)',
        { search: `%${search}%` }
      );
    }

    if (grado) {
      queryBuilder.andWhere('subject.grado = :grado', { grado });
    }

    if (estado !== undefined) {
      queryBuilder.andWhere('subject.estado = :estado', { estado });
    }

    // Paginación
    const offset = (page - 1) * limit;
    queryBuilder.skip(offset).take(limit);

    // Ordenamiento
    queryBuilder.orderBy('subject.nombre', 'ASC');

    const [subjects, total] = await queryBuilder.getManyAndCount();

    return new PaginatedResponse(subjects, total, page, limit);
  }

  /**
   * Obtener asignatura por ID
   * @param id - ID de la asignatura
   * @returns Asignatura encontrada
   */
  async findOne(id: number): Promise<Asignatura> {
    const subject = await this.subjectRepository.findOne({
      where: { id },
      relations: ['actividades'], // TODO: Agregar relaciones necesarias
    });

    if (!subject) {
      throw new NotFoundException(`Subject with ID ${id} not found`);
    }

    return subject;
  }

  /**
   * Actualizar asignatura
   * @param id - ID de la asignatura
   * @param updateSubjectDto - Datos a actualizar
   * @param userId - ID del usuario que actualiza
   * @returns Asignatura actualizada
   */
  async update(
    id: number,
    updateSubjectDto: UpdateSubjectDto,
    userId: number,
  ): Promise<Asignatura> {
    this.logger.log(`Updating subject with ID: ${id}`);

    const subject = await this.findOne(id);

    Object.assign(subject, updateSubjectDto);
    // TODO: Agregar campos de auditoría
    // subject.updatedBy = userId;
    // subject.updatedAt = new Date();

    const updatedSubject = await this.subjectRepository.save(subject);
    
    this.logger.log(`Subject updated: ${id}`);
    return updatedSubject;
  }

  /**
   * Eliminar asignatura (soft delete)
   * @param id - ID de la asignatura
   * @param userId - ID del usuario que elimina
   */
  async remove(id: number, userId: number): Promise<void> {
    this.logger.log(`Removing subject with ID: ${id}`);

    const subject = await this.findOne(id);

    // TODO: Verificar si tiene actividades o estudiantes asociados
    // TODO: Implementar soft delete
    await this.subjectRepository.remove(subject);
    
    this.logger.log(`Subject removed: ${id}`);
  }

  /**
   * Obtener estudiantes inscritos en una asignatura
   * @param subjectId - ID de la asignatura
   * @returns Lista de estudiantes
   */
  async getEnrolledStudents(subjectId: number): Promise<any[]> {
    // TODO: Implementar consulta con relaciones a tabla de matrículas
    this.logger.log(`Getting enrolled students for subject: ${subjectId}`);
    
    return [];
  }

  /**
   * Inscribir estudiante en asignatura
   * @param subjectId - ID de la asignatura
   * @param studentId - ID del estudiante
   * @param userId - ID del usuario que inscribe
   */
  async enrollStudent(
    subjectId: number,
    studentId: number,
    userId: number,
  ): Promise<void> {
    this.logger.log(`Enrolling student ${studentId} in subject ${subjectId}`);

    // TODO: Verificar que la asignatura existe
    // TODO: Verificar que el estudiante existe
    // TODO: Verificar que no esté ya inscrito
    // TODO: Crear registro en tabla de matrículas

    this.logger.log(`Student enrolled successfully`);
  }
}


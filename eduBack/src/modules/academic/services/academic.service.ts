import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actividad } from '../activities/entities/actividad.entity';
import { Asignatura } from '../subjects/entities/asignatura.entity';
import { CreateActividadDto, CreateAsignaturaDto } from '../dto/academic.dto';

@Injectable()
export class AcademicService {
  constructor(
    @InjectRepository(Actividad)
    private readonly actividadRepository: Repository<Actividad>,
    @InjectRepository(Asignatura)
    private readonly asignaturaRepository: Repository<Asignatura>,
  ) {}

  // Actividades
  async findAllActividades(page: number = 1, limit: number = 10, filters?: any) {
    const queryBuilder = this.actividadRepository
      .createQueryBuilder('actividad')
      .leftJoinAndSelect('actividad.asignatura', 'asignatura')
      .leftJoinAndSelect('actividad.usuario_creador', 'usuario_creador');

    if (filters?.asignatura_id) {
      queryBuilder.andWhere('actividad.asignatura_id = :asignatura_id', { asignatura_id: filters.asignatura_id });
    }

    if (filters?.grupo_id) {
      queryBuilder.andWhere('actividad.grupo_id = :grupo_id', { grupo_id: filters.grupo_id });
    }

    if (filters?.periodo_id) {
      queryBuilder.andWhere('actividad.periodo_academico_id = :periodo_id', { periodo_id: filters.periodo_id });
    }

    if (filters?.search) {
      queryBuilder.andWhere(
        'actividad.titulo LIKE :search OR actividad.descripcion LIKE :search',
        { search: `%${filters.search}%` }
      );
    }

    const [actividades, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('actividad.fecha_creacion', 'DESC')
      .getManyAndCount();

    return {
      data: actividades,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOneActividad(id: number): Promise<Actividad> {
    const actividad = await this.actividadRepository.findOne({
      where: { id },
      relations: [
        'asignatura',
        'usuario_creador'
      ],
    });

    if (!actividad) {
      throw new NotFoundException(`Actividad con ID ${id} no encontrada`);
    }

    return actividad;
  }

  async createActividad(createActividadDto: CreateActividadDto): Promise<Actividad> {
    const actividad = this.actividadRepository.create(createActividadDto);
    const savedActividad = await this.actividadRepository.save(actividad);
    return this.findOneActividad(savedActividad.id);
  }

  async updateActividad(id: number, updateData: Partial<CreateActividadDto>): Promise<Actividad> {
    await this.actividadRepository.update(id, updateData);
    return this.findOneActividad(id);
  }

  async removeActividad(id: number): Promise<void> {
    const result = await this.actividadRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Actividad con ID ${id} no encontrada`);
    }
  }

  // Asignaturas
  async findAllAsignaturas(page: number = 1, limit: number = 10, search?: string) {
    const queryBuilder = this.asignaturaRepository
      .createQueryBuilder('asignatura');

    if (search) {
      queryBuilder.where(
        'asignatura.nombre LIKE :search OR asignatura.codigo LIKE :search',
        { search: `%${search}%` }
      );
    }

    const [asignaturas, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('asignatura.nombre', 'ASC')
      .getManyAndCount();

    return {
      data: asignaturas,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOneAsignatura(id: number): Promise<Asignatura> {
    const asignatura = await this.asignaturaRepository.findOne({
      where: { id },
      relations: ['actividades'],
    });

    if (!asignatura) {
      throw new NotFoundException(`Asignatura con ID ${id} no encontrada`);
    }

    return asignatura;
  }

  async createAsignatura(createAsignaturaDto: CreateAsignaturaDto): Promise<Asignatura> {
    const asignatura = this.asignaturaRepository.create(createAsignaturaDto);
    const savedAsignatura = await this.asignaturaRepository.save(asignatura);
    return this.findOneAsignatura(savedAsignatura.id);
  }

  async updateAsignatura(id: number, updateData: Partial<CreateAsignaturaDto>): Promise<Asignatura> {
    await this.asignaturaRepository.update(id, updateData);
    return this.findOneAsignatura(id);
  }

  async removeAsignatura(id: number): Promise<void> {
    const result = await this.asignaturaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Asignatura con ID ${id} no encontrada`);
    }
  }

  async getAcademicStats() {
    const totalAsignaturas = await this.asignaturaRepository.count();
    const totalActividades = await this.actividadRepository.count();
    const actividadesActivas = await this.actividadRepository
      .createQueryBuilder('actividad')
      .where('actividad.fecha_limite_entrega > :now', { now: new Date() })
      .getCount();

    const actividadesPorTipo = await this.actividadRepository
      .createQueryBuilder('actividad')
      .select('actividad.tipo_actividad', 'tipo')
      .addSelect('COUNT(actividad.id)', 'count')
      .groupBy('actividad.tipo_actividad')
      .getRawMany();

    return {
      totalAsignaturas,
      totalActividades,
      actividadesActivas,
      actividadesVencidas: totalActividades - actividadesActivas,
      actividadesPorTipo,
    };
  }
}


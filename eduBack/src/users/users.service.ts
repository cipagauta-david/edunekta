import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll(page: number = 1, limit: number = 10, search?: string) {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .select([
        'user.id',
        'user.nombre',
        'user.apellido',
        'user.email',
        'user.documento',
        'user.telefono',
        'user.activo',
        'user.ultimo_acceso',
        'user.fecha_creacion',
        'roles.id',
        'roles.nombre'
      ]);

    if (search) {
      queryBuilder.where(
        'user.nombre LIKE :search OR user.apellido LIKE :search OR user.email LIKE :search OR user.documento LIKE :search',
        { search: `%${search}%` }
      );
    }

    const [users, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('user.fecha_creacion', 'DESC')
      .getManyAndCount();

    return {
      data: users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['roles'],
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        documento: true,
        tipo_documento: true,
        fecha_nacimiento: true,
        telefono: true,
        direccion: true,
        genero: true,
        activo: true,
        email_verificado: true,
        ultimo_acceso: true,
        fecha_creacion: true,
        fecha_actualizacion: true,
      }
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if email already exists
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

    // Get roles if provided
    let roles: Role[] = [];
    if (createUserDto.roleIds && createUserDto.roleIds.length > 0) {
      roles = await this.roleRepository.findByIds(createUserDto.roleIds);
    } else {
      // Default role: Estudiante
      const defaultRole = await this.roleRepository.findOne({ where: { nombre: 'Estudiante' } });
      if (defaultRole) {
        roles = [defaultRole];
      }
    }

    // Create user
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      roles,
    });

    const savedUser = await this.userRepository.save(user);
    
    // Return user without password
    return this.findOne(savedUser.id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // Check email uniqueness if email is being updated
    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.findByEmail(updateUserDto.email);
      if (existingUser) {
        throw new ConflictException('El email ya está registrado');
      }
    }

    // Update roles if provided
    if (updateUserDto.roleIds) {
      const roles = await this.roleRepository.findByIds(updateUserDto.roleIds);
      user.roles = roles;
    }

    // Update other fields
    Object.assign(user, updateUserDto);

    await this.userRepository.save(user);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    
    // Soft delete by setting activo to false
    user.activo = false;
    await this.userRepository.save(user);
  }

  async updateLastAccess(id: number): Promise<void> {
    await this.userRepository.update(id, {
      ultimo_acceso: new Date(),
    });
  }

  async changePassword(id: number, newPassword: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await this.userRepository.update(id, {
      password: hashedPassword,
    });
  }

  async verifyEmail(id: number): Promise<void> {
    await this.userRepository.update(id, {
      email_verificado: true,
      token_verificacion: undefined,
    });
  }

  async getUserStats() {
    const total = await this.userRepository.count();
    const active = await this.userRepository.count({ where: { activo: true } });
    const verified = await this.userRepository.count({ where: { email_verificado: true } });
    
    const roleStats = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.roles', 'role')
      .select('role.nombre', 'role_name')
      .addSelect('COUNT(user.id)', 'count')
      .where('user.activo = :activo', { activo: true })
      .groupBy('role.nombre')
      .getRawMany();

    return {
      total,
      active,
      verified,
      inactive: total - active,
      roleDistribution: roleStats,
    };
  }
}


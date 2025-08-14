import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { User, Rol } from '../../entities/user.entity';

interface CreateUserDto {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol?: Rol;
}

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly repo: Repository<User>) {}

  async create(dto: CreateUserDto, tenantId?: number) {
    const entity = this.repo.create({
      nombre: dto.nombre,
      apellido: dto.apellido,
      email: dto.email,
      passwordHash: dto.password, // TODO: hash in real app
      rol: dto.rol ?? 'ADMIN',
      institucionId: tenantId ?? null,
    });
    return this.repo.save(entity);
  }

  findAll(tenantId?: number) {
    return this.repo.find({ where: { institucionId: tenantId ?? IsNull() } as any });
  }

  async findOne(id: number, tenantId?: number) {
    const where: any = { id };
    if (tenantId == null) where.institucionId = IsNull();
    else where.institucionId = tenantId;
    const user = await this.repo.findOne({ where });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}

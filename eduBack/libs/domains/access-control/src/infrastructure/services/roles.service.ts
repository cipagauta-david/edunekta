import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from '../../entities/role.entity';
import { Permiso } from '../../entities/permiso.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roles: Repository<Role>,
    @InjectRepository(Permiso) private readonly permisos: Repository<Permiso>,
  ) {}

  findAll() {
    return this.roles.find({ relations: ['permisos'] });
  }

  async findOne(id: number) {
    const role = await this.roles.findOne({ where: { id }, relations: ['permisos'] });
    if (!role) throw new NotFoundException('Rol no encontrado');
    return role;
  }

  async create(dto: Partial<Role> & { permisos?: number[] }) {
    const created = this.roles.create({ ...(dto as any) }) as unknown as Role; // disambiguate overload
    const role: Role = created;
    if (dto.permisos) {
      role.permisos = await this.permisos.findBy({ id: In(dto.permisos) as any });
    }
    return this.roles.save(role);
  }

  async update(id: number, dto: Partial<Role> & { permisos?: number[] }) {
    const role = await this.findOne(id);
    Object.assign(role, dto);
    if (dto.permisos) {
      role.permisos = await this.permisos.findBy({ id: In(dto.permisos) as any });
    }
    return this.roles.save(role);
  }

  async remove(id: number) {
    const role = await this.findOne(id);
    await this.roles.remove(role);
  }
}

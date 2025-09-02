import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserDAO } from '../dao';
import { CreateUserDto, UpdateUserDto } from '../../dto';

@Injectable()
export class UsersService {
  constructor(private readonly dao: UserDAO) {}

  async create(dto: CreateUserDto, tenantId?: number) {
    const existingUser = await this.dao.findByEmail(dto.email, tenantId);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const { password, ...userDto } = dto;
    const user = await this.dao.create(
      { ...userDto, passwordHash: hashedPassword },
      tenantId,
    );
    delete user.passwordHash;
    return user;
  }

  findAll(tenantId?: number) {
    return this.dao.findAll(tenantId);
  }

  async findOne(id: number, tenantId?: number) {
    const user = await this.dao.findOne(id, tenantId);
    delete user.passwordHash;
    return user;
  }

  async update(id: number, dto: UpdateUserDto, tenantId?: number) {
    const data: any = { ...dto };
    if (dto.password) {
      data.passwordHash = await bcrypt.hash(dto.password, 10);
      delete data.password;
    }
    const user = await this.dao.update(id, data, tenantId);
    delete user.passwordHash;
    return user;
  }

  remove(id: number, tenantId?: number) {
    return this.dao.remove(id, tenantId);
  }
}

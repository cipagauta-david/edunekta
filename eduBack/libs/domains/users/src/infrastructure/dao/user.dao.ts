import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class UserDAO {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  create(dto: any, institucionId?: number) {
    const [entity] = this.repository.create(dto);
    entity.institucionId = institucionId ?? null;
    return this.repository.save(entity);
  }

  findAll(institucionId?: number) {
    return this.repository.find({
      where: { institucionId: institucionId ?? IsNull() } as any,
    });
  }

  async findOne(id: number, institucionId?: number) {
    const where: any = { id };
    if (institucionId === undefined) {
      where.institucionId = IsNull();
    } else {
      where.institucionId = institucionId;
    }
    const user = await this.repository.findOne({ where });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string, institucionId?: number) {
    const where: any = { email };
    if (institucionId === undefined) {
      where.institucionId = IsNull();
    } else {
      where.institucionId = institucionId;
    }
    return this.repository.findOne({ where });
  }

  async update(id: number, dto: any, institucionId?: number) {
    const entity = await this.findOne(id, institucionId);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(id: number, institucionId?: number) {
    const entity = await this.findOne(id, institucionId);
    await this.repository.remove(entity);
    return entity;
  }
}

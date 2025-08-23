import { Injectable } from '@nestjs/common';
import { InstitutionDAO } from '../dao';
import { CreateInstitutionDto, UpdateInstitutionDto } from '../../application/dtos';

@Injectable()
export class InstitutionsService {
  constructor(private readonly dao: InstitutionDAO) {}

  findAll() {
    return this.dao.findAll();
  }

  findOne(id: number) {
    return this.dao.findOne(id);
  }

  create(dto: CreateInstitutionDto) {
    return this.dao.create(dto);
  }

  update(id: number, dto: UpdateInstitutionDto) {
    return this.dao.update(id, dto);
  }

  remove(id: number) {
    return this.dao.remove(id);
  }
}

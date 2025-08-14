import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institucion } from './entities/institucion.entity';
import { InstitutionsController } from './infrastructure/controllers/institutions.controller';
import { InstitutionsService } from './infrastructure/services/institutions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Institucion])],
  controllers: [InstitutionsController],
  providers: [InstitutionsService],
  exports: [InstitutionsService],
})
export class InstitutionsModule {}

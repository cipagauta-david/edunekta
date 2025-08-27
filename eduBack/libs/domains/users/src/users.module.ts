import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './infrastructure/controllers/users.controller';
import { UsersService } from './infrastructure/services/users.service';
import { User } from './entities/user.entity';
import { EstudianteAcudiente } from './entities/estudiante-acudiente.entity';
import { UserDAO, EstudianteAcudienteDAO } from './infrastructure/dao';
import { EstudianteAcudienteService } from './infrastructure/services/estudiante-acudiente.service';
import { EstudianteAcudienteController } from './infrastructure/controllers/estudiante-acudiente.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, EstudianteAcudiente])],
  controllers: [UsersController, EstudianteAcudienteController],
  providers: [
    UsersService,
    UserDAO,
    EstudianteAcudienteService,
    EstudianteAcudienteDAO,
  ],
  exports: [
    UsersService,
    UserDAO,
    EstudianteAcudienteService,
    EstudianteAcudienteDAO,
  ],
})
export class UsersModule {}

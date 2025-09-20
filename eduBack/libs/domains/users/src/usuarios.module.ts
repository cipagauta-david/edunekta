import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './infrastructure/controllers/usuario.controller';
import { UsersService } from './infrastructure/services/users.service';
import { Usuario } from './entities/usuario.entity';
import { EstudianteAcudiente } from './entities/estudiante-acudiente.entity';
import { ArchivoDigital } from '@app/core';
import { UsuarioDao, EstudianteAcudienteDAO } from './infrastructure/dao';
import { EstudianteAcudienteService } from './infrastructure/services/estudiante-acudiente.service';
import { EstudianteAcudienteController } from './infrastructure/controllers/estudiante-acudiente.controller';
import { FinancialModule } from '@app/domains/financial';
import { UsuarioRol } from './entities/usuario-rol.entity';
import { Rol } from './entities/rol.entity';
import { RolPermiso } from './entities/rol-permiso.entity';
import { Permiso } from './entities/permiso.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      UsuarioRol,
      Rol,
      RolPermiso,
      Permiso,
      EstudianteAcudiente,
      ArchivoDigital,
      FinancialModule,
    ]),
  ],
  controllers: [UsuarioController, EstudianteAcudienteController],
  providers: [
    UsersService,
    UsuarioDao,
    EstudianteAcudienteService,
    EstudianteAcudienteDAO,
  ],
  exports: [
    UsersService,
    UsuarioDao,
    EstudianteAcudienteService,
    EstudianteAcudienteDAO,
  ],
})
export class UsersModule {}

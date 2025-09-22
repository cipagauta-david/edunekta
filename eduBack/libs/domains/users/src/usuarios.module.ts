import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './infrastructure/controllers/usuario.controller';
import { UsersService } from './infrastructure/services/users.service';
import { Usuario } from './entities/usuario.entity';
import { EstudianteAcudiente } from './entities/estudiante-acudiente.entity';
import { ArchivoDigital } from '@app/core';
import {
  UsuarioDao,
  EstudianteAcudienteDAO,
  PermisoDao,
  RolDao,
  RolPermisoDao,
  UsuarioRolDao,
} from './infrastructure/dao';
import { EstudianteAcudienteService } from './infrastructure/services/estudiante-acudiente.service';
import { EstudianteAcudienteController } from './infrastructure/controllers/estudiante-acudiente.controller';
import { FinancialModule } from '@app/domains/financial';
import { UsuarioRol } from './entities/usuario-rol.entity';
import { Rol } from './entities/rol.entity';
import { RolPermiso } from './entities/rol-permiso.entity';
import { Permiso } from './entities/permiso.entity';
import { PermisoController } from './infrastructure/controllers/permiso.controller';
import { RolController } from './infrastructure/controllers/rol.controller';
import { RolPermisoController } from './infrastructure/controllers/rol-permiso.controller';
import { UsuarioRolController } from './infrastructure/controllers/usuario-rol.controller';
import { PermisoService } from './infrastructure/services/permiso.service';
import { RolService } from './infrastructure/services/rol.service';
import { RolPermisoService } from './infrastructure/services/rol-permiso.service';
import { UsuarioRolService } from './infrastructure/services/usuario-rol.service';

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
    ]),
    FinancialModule,
  ],
  controllers: [
    UsuarioController,
    EstudianteAcudienteController,
    PermisoController,
    RolController,
    RolPermisoController,
    UsuarioRolController,
  ],
  providers: [
    UsersService,
    UsuarioDao,
    EstudianteAcudienteService,
    EstudianteAcudienteDAO,
    PermisoService,
    PermisoDao,
    RolService,
    RolDao,
    RolPermisoService,
    RolPermisoDao,
    UsuarioRolService,
    UsuarioRolDao,
  ],
  exports: [
    UsersService,
    UsuarioDao,
    EstudianteAcudienteService,
    EstudianteAcudienteDAO,
    PermisoService,
    PermisoDao,
    RolService,
    RolDao,
    RolPermisoService,
    RolPermisoDao,
    UsuarioRolService,
    UsuarioRolDao,
  ],
})
export class UsersModule {}

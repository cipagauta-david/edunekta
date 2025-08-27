import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permiso } from './entities/permiso.entity';
import { Role } from './entities/role.entity';
import { PermisosController } from './infrastructure/controllers/permisos.controller';
import { RolesController } from './infrastructure/controllers/roles.controller';
import { PermisosService } from './infrastructure/services/permisos.service';
import { RolesService } from './infrastructure/services/roles.service';
import { PermisoDao } from './infrastructure/daos/permiso.dao';
import { RoleDao } from './infrastructure/daos/role.dao';

@Module({
  imports: [TypeOrmModule.forFeature([Permiso, Role])],
  controllers: [PermisosController, RolesController],
  providers: [PermisosService, RolesService, PermisoDao, RoleDao],
  exports: [PermisosService, RolesService],
})
export class AccessControlModule {}

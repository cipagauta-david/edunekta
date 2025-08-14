import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { Roles, Role, AuthUser } from '@app/auth';
import { UsersService } from '../services/users.service';

class CreateUserDto {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('ADMIN' as Role)
  @Post()
  create(@Body() dto: CreateUserDto, @AuthUser() user: any) {
    return this.usersService.create(dto as any, user?.tenantId);
  }

  @Get()
  findAll(@AuthUser() user: any) {
    return this.usersService.findAll(user?.institucionId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @AuthUser() user: any) {
    return this.usersService.findOne(id, user?.institucionId);
  }
}

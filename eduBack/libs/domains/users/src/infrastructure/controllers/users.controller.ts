import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { Roles, Role, AuthUser } from '@app/auth';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../../dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('ADMIN' as Role)
  @Post()
  create(@Body() dto: CreateUserDto, @AuthUser() user: any) {
    return this.usersService.create(dto, user?.institucionId);
  }

  @Get()
  findAll(@AuthUser() user: any) {
    return this.usersService.findAll(user?.institucionId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @AuthUser() user: any) {
    return this.usersService.findOne(id, user?.institucionId);
  }

  @Roles('ADMIN' as Role)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
    @AuthUser() user: any,
  ) {
    return this.usersService.update(id, dto, user?.institucionId);
  }

  @Roles('ADMIN' as Role)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @AuthUser() user: any) {
    return this.usersService.remove(id, user?.institucionId);
  }
}

import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Decorator para definir los roles requeridos para acceder a un endpoint
 * @param roles - Array de roles permitidos
 * @example
 * @Roles('admin', 'teacher')
 * @Get('users')
 * getUsers() { ... }
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);


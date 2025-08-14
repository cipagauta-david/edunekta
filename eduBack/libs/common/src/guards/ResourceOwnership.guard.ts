import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OWNERSHIP_KEY } from '../decorators/CheckOwnership.decorator';

@Injectable()
export class ResourceOwnershipGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const resource = this.reflector.getAllAndOverride<string | undefined>(OWNERSHIP_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!resource) return true;
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.sub;
    // TODO: implement resource-specific ownership checking
    if (!userId) {
      throw new ForbiddenException('Ownership validation failed');
    }
    return true;
  }
}

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    // Header could be x-tenant-id or x-institucion-id; adjust as needed
    const tenantIdHeader = req.headers['x-tenant-id'] || req.headers['x-institucion-id'];

    // For public routes or auth endpoints you might allow missing tenantId. Here we make it optional.
    if (tenantIdHeader) {
      const tenantId = Array.isArray(tenantIdHeader)
        ? tenantIdHeader[0]
        : tenantIdHeader;

      const parsed = Number(tenantId);
      if (Number.isNaN(parsed)) {
        throw new BadRequestException('x-tenant-id header must be a number');
      }
      req.tenantId = parsed; // attach to request
    }

    return next.handle();
  }
}

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';
import { Observable } from 'rxjs';

export interface TenantContextStore {
  institutionId?: string;
}

@Injectable()
export class TenantContextInterceptor implements NestInterceptor {
  private readonly als = new AsyncLocalStorage<TenantContextStore>();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const institutionId = request.user?.institutionId;
    return this.als.run({ institutionId }, () => next.handle());
  }
}

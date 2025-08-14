import { AsyncLocalStorage } from 'node:async_hooks';
import { Provider } from '@nestjs/common';

export interface TenantContextStore {
  institutionId?: string;
}

export const TENANT_CONTEXT = 'TENANT_CONTEXT';

export const TenantContextProvider: Provider = {
  provide: TENANT_CONTEXT,
  useValue: new AsyncLocalStorage<TenantContextStore>(),
};

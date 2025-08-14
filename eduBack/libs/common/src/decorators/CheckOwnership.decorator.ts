import { SetMetadata } from '@nestjs/common';

export const OWNERSHIP_KEY = 'ownership_resource';
export const CheckOwnership = (resource: string) => SetMetadata(OWNERSHIP_KEY, resource);

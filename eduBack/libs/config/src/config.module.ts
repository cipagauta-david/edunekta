import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration, { validationSchema } from './configuration';
import { join } from 'path';

const envFilePath = [
  // Look for .env in current working directory
  join(process.cwd(), '.env'),
  // Fallback: project root
  '.env',
  // Fallback when running from monorepo root
  'eduBack/.env',
];

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      expandVariables: true,
      validationSchema,
      envFilePath,
    }),
  ],
})
export class ConfigModule {}

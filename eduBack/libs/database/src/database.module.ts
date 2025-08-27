import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ConfigModule as NestConfigModule,
  ConfigService,
} from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [NestConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const envDb = {
          DB_HOST: config.get<string>('DB_HOST'),
          DB_PORT: config.get<number>('DB_PORT'),
          DB_USER: config.get<string>('DB_USER'),
          DB_USERNAME: config.get<string>('DB_USERNAME'),
          DB_PASSWORD: config.get<string>('DB_PASSWORD'),
          DB_NAME: config.get<string>('DB_NAME'),
          DB_DATABASE: config.get<string>('DB_DATABASE'),
        };

        const host = envDb.DB_HOST;
        const port = envDb.DB_PORT;
        // Prefer DB_USERNAME and DB_DATABASE when provided, fall back to DB_USER/DB_NAME
        const username = envDb.DB_USERNAME ?? envDb.DB_USER;
        const password = config.get<string>('DB_PASSWORD');
        const database = envDb.DB_DATABASE ?? envDb.DB_NAME;

        const ormConfig: any = {
          type: 'mysql',
          host,
          port,
          username,
          password,
          database,
          autoLoadEntities: true,
          synchronize: false,
        };

        if (config.get<string>('NODE_ENV') !== 'production') {
          const safeLog = {
            ...ormConfig,
            password: password ? '***' : undefined,
          };

          console.log('[DatabaseModule] Resolved env (partial):', safeLog);
        }

        return ormConfig;
      },
    }),
  ],
})
export class DatabaseModule {}

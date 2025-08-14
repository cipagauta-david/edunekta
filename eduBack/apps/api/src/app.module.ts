import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TenantInterceptor, AllExceptionsFilter } from '@app/common';
import { ConfigModule } from '@app/config';
import { DatabaseModule } from '@app/database';
import { AuthModule, JwtAuthGuard, RolesGuard } from '@app/auth';
import { AppController } from './app.controller';
import { UsersModule } from '@app/domains/users';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: TenantInterceptor },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Core modules
import { ConfigModule } from './core/config/config.module';
import { DatabaseModule } from './core/database/database.module';
import { AuthModule } from './core/auth/auth.module';

// Feature modules
import { UsersModule } from './modules/users/users.module';
import { AcademicModule } from './modules/academic/academic.module';

@Module({
  imports: [
    // Core infrastructure
    ConfigModule,
    DatabaseModule,
    AuthModule,
    
    // Feature modules
    UsersModule,
    AcademicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


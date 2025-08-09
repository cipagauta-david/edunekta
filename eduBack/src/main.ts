import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Enable CORS
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN')?.split(',') || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // API prefix
  app.setGlobalPrefix('api/v1');

  const port = configService.get<number>('PORT') || 3000;

  // Listen on all interfaces for deployment compatibility
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 EduBack API is running on: http://0.0.0.0:${port}/api/v1`);
  console.log(`📚 Database: ${configService.get<string>('DB_DATABASE')}`);
  console.log(`🌍 Environment: ${configService.get<string>('NODE_ENV')}`);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  // Minimal bootstrap; PublisherService will run on init

  console.log('📦 Outbox Publisher worker started');
}

bootstrap();

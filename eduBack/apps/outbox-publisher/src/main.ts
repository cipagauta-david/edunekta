import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  // Minimal bootstrap; PublisherService will run on init
  // eslint-disable-next-line no-console
  console.log('📦 Outbox Publisher worker started');
}

bootstrap();

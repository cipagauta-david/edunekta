import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Prefer ConfigService for env-derived values
  const configService = await app.get(ConfigService);
  const portFromConfig = configService.get<number>('app.port');
  const port =
    portFromConfig ?? (process.env.PORT ? Number(process.env.PORT) : 3000);

  await app.listen(port);

  console.log(`API running on http://localhost:${port}`);
}
bootstrap();

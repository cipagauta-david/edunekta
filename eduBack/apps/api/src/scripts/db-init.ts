import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SqlInitService } from '../../../../libs/database/src/sql-init.service';
import * as path from 'path';

async function run() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['log', 'error', 'warn'],
  });

  try {
    const sqlInit = app.get(SqlInitService);
    const sqlPath = path.resolve(process.cwd(), '../edunekta3.sql');
    await sqlInit.runSqlFromFile(sqlPath);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exitCode = 1;
  } finally {
    await app.close();
  }
}

run();

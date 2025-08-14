import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import mysql from 'mysql2/promise';

@Injectable()
export class SqlInitService {
  private readonly logger = new Logger(SqlInitService.name);

  constructor(private readonly config: ConfigService) {}

  async runSqlFromFile(sqlFilePath: string) {
    const db = this.config.get('database');

    const absolutePath = path.isAbsolute(sqlFilePath)
      ? sqlFilePath
      : path.join(process.cwd(), sqlFilePath);

    this.logger.log(`Initializing database using: ${absolutePath}`);

    if (!fs.existsSync(absolutePath)) {
      throw new Error(`SQL file not found at: ${absolutePath}`);
    }

    const raw = fs.readFileSync(absolutePath, 'utf8');

    // Split statements respecting DELIMITER blocks used for triggers
    const statements = this.splitMySqlStatements(raw);

    const connection = await mysql.createConnection({
      host: db.host,
      port: db.port,
      user: db.user,
      password: db.pass,
      multipleStatements: true,
      // Don't pass database here because the script may CREATE DATABASE and USE it.
    });

    try {
      for (const stmt of statements) {
        const sql = stmt.trim();
        if (!sql) continue;
        this.logger.debug(`Executing SQL chunk (${sql.substring(0, 80).replace(/\n/g, ' ')}...)`);
        await connection.query(sql);
      }
      this.logger.log('Database initialization completed successfully.');
    } finally {
      await connection.end();
    }
  }

  // Minimal MySQL statement splitter that supports DELIMITER changes for triggers/procedures
  private splitMySqlStatements(sql: string): string[] {
    const lines = sql.split(/\r?\n/);
    let delimiter = ';';
    let buffer: string[] = [];
    const chunks: string[] = [];

    const flush = () => {
      if (buffer.length) {
        chunks.push(buffer.join('\n'));
        buffer = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Handle DELIMITER directive
      if (/^DELIMITER\s+/i.test(trimmed)) {
        // When delimiter changes, flush current buffer if any
        flush();
        delimiter = trimmed.replace(/^DELIMITER\s+/i, '');
        continue;
      }

      buffer.push(line);

      // If current buffer ends with the delimiter at end of line, cut it and flush
      if (buffer.join('\n').endsWith(delimiter)) {
        const combined = buffer.join('\n');
        const chunk = combined.slice(0, combined.length - delimiter.length);
        chunks.push(chunk);
        buffer = [];
      }
    }

    // leftover
    flush();

    return chunks;
  }
}

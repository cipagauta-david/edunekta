import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PublisherService implements OnModuleInit {
  private readonly logger = new Logger(PublisherService.name);

  async onModuleInit() {
    this.logger.log('PublisherService initialized');
    // TODO: poll outbox table and publish events, then mark as processed
  }
}

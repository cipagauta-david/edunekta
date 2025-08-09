import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {
  // TODO: Implement email configuration
  // - SMTP setup
  // - Template engine
  // - Queue management
}


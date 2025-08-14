import { Controller, Get } from '@nestjs/common';
import { Public } from '@app/auth';

@Controller()
export class AppController {
  @Public()
  @Get('health')
  health() {
    return { status: 'ok' };
  }
}

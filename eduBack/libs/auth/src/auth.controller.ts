import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/Public.decorator';

class LoginDto {
  username: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    // Dummy validation: in real code query DB. For now, accept any user and return token
    return this.authService.issueToken({
      sub: 1,
      username: dto.username,
      role: 'ADMIN',
      tenantId: 1,
    });
  }
}

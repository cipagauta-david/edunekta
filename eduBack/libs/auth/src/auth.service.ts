import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}

  issueToken(payload: string) {
    return {
      access_token: this.jwt.sign(payload),
    };
  }
}

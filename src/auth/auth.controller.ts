import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Api } from '../api';

@Controller()
export class AuthController {
  constructor(private api: Api) {}

  @Post('auth/sign_in')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.api.singIn(authCredentialsDto);
  }
}



import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO } from '../manufacturer.dto';

@Controller('manufacturer/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginData: loginDTO) {
    return await this.authService.login(loginData);
  }
}

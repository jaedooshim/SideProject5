import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './types/login/request.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() body: LoginDto): Promise<string> {
    return await this.authService.login(body);
  }
}

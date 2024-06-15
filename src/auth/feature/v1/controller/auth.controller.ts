import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import {
  BiometricLoginUserInput,
  CreateUserInput,
  LoginUserInput,
} from 'src/graphql/user/dto/create-user.input';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async Create(@Body() payload: CreateUserInput) {
    return await this.authService.register(payload);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async Login(@Body() payload: LoginUserInput) {
    return await this.authService.login({
      email: payload.email,
      password: payload.password,
    });
  }

  @Post('biometricKey/login')
  @HttpCode(HttpStatus.OK)
  async BiometricLogin(@Body() payload: BiometricLoginUserInput) {
    return await this.authService.biometricLogin({
      biometricKey: payload.biometricKey,
    });
  }
}

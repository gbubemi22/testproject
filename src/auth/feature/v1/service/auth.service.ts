import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma_service/prisma.service';
import BcryptUtil from 'src/utils/bcrypt.util';
import AuthRepository from '../repository/auth.repository';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateUserInput,
  LoginUserInput,
} from 'src/graphql/user/dto/create-user.input';
import { RegisterResponse } from 'src/graphql/user/model/register-response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly bcryptUtil: BcryptUtil,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly authRepository: AuthRepository,
  ) {}

  validatePasswordString(password: string) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

    if (!password.match(regex)) {
      throw new BadRequestException(
        'Password must contain a capital letter, number, special character & greater than 8 digits.',
      );
    }

    return true;
  }

  async register(createUserInput: CreateUserInput): Promise<RegisterResponse> {
    try {
      const { email, password } = createUserInput;

      const existingUser = await this.prisma.user.findFirst({
        where: { email },
      });
      if (existingUser) {
        throw new ConflictException('Email already in use');
      }

      const hashedPassword = await this.bcryptUtil.hash(password);
      console.log(hashedPassword);

      const user = await this.prisma.user.create({
        data: {
          email,
          password,
          biometricKey: uuidv4(),
        },
      });

      return { user };
    } catch (error) {
      console.log('Error', error);
    }
  }

  async login(loginUserInput: LoginUserInput) {
    try {
      const { email, password } = loginUserInput;

      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      console.log(user);

      if (!user) throw new UnauthorizedException('Invalid credentials');

      const isPasswordValid = await this.bcryptUtil.compare(
        password,
        user.password,
      );
      console.log(isPasswordValid);

      if (isPasswordValid)
        throw new UnauthorizedException('Invalid credentials');

      const jwtPayload = {
        id: user.id,
        email: user.email,
      };

      const token = this.jwtService.sign(jwtPayload);

      const sessionPayload = {
        id: user.id,
        email: user.email,
      };

      this.authRepository.createSession(user.id, sessionPayload);

      return {
        user,
        token,
      };
    } catch (error) {
      console.log('Error', error);
    }
  }

  async biometricLogin(biometricKey: string) {
    const user = await this.prisma.user.findFirst({ where: { biometricKey } });

    if (!user) throw new UnauthorizedException('Invalid biometric key');

    const jwtPayload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(jwtPayload);

    const sessionPayload = { id: user.id, email: user.email };
    await this.authRepository.createSession(user.id, sessionPayload);

    return { user, token };
  }
}

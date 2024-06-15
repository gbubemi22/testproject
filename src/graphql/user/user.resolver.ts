import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma_service/prisma.service';
import { User, User as UserModel } from './model/user.model';
import {
  AuthResponse,
  CreateUserInput,
  LoginUserInput,
} from './dto/create-user.input';
import { AuthService } from 'src/auth/feature/v1/service/auth.service';
import { RegisterResponse } from './model/register-response.dto';

@Resolver('User')
export class UserResolver {
  constructor(
    private prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => [UserModel])
  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  @Mutation(() => RegisterResponse)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<RegisterResponse> {
    return this.authService.register(createUserInput);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => AuthResponse)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<AuthResponse> {
    return this.authService.login(loginUserInput);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation((returns) => AuthResponse)
  async biometricLogin(
    @Args('biometricKey') biometricKey: string,
  ): Promise<AuthResponse> {
    return this.authService.biometricLogin(biometricKey);
  }
}

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { DecodedToken } from '../v1/interface/decoded-token.interface';
import AuthRepository from '../v1/repository/auth.repository';

@Injectable()
export class AuthSessionGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async decodeToken(token: string): Promise<DecodedToken | boolean> {
    try {
      const decodedToken = (await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })) as any;

      return decodedToken;
    } catch (error) {
      return false;
    }
  }

  async validateRequest(request: Request): Promise<boolean> {
    const authHeader = request.headers.authorization as string;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Please provide a valid Bearer token in Authorization header.',
      );
    }

    const authToken = authHeader.substring(7);

    if (!authToken) {
      throw new UnauthorizedException(
        'Auth token not found in Authorization header.',
      );
    }

    const decodedToken = (await this.decodeToken(authToken)) as DecodedToken;

    if (!decodedToken)
      throw new UnauthorizedException(
        'Invalid auth token or token has expired, please login to get new token.',
      );

    console.log('Decoded Token:', decodedToken);

    const session = await this.authRepository.getSession(decodedToken.id);

    if (!session) throw new UnauthorizedException('Please login again.');

    request.user = session;

    return true;
  }
}

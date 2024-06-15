import { Module } from '@nestjs/common';
import { AuthService } from './feature/v1/service/auth.service';
import { AuthController } from './feature/v1/controller/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { RedisService } from 'src/redis/redis.service';
import BcryptUtil from 'src/utils/bcrypt.util';
import { JwtGuard } from './feature/guards/jwt.guard';
import { JwtStrategy } from './feature/guards/jwt.strategy';
import AuthRepository from './feature/v1/repository/auth.repository';
import { LogService } from 'src/logger/logger.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '100d' },
      }),
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    BcryptUtil,
    AuthService,
    JwtGuard,
    JwtStrategy,
    RedisService,
    AuthRepository,
    LogService,
    JwtService,
  ],
})
export class AuthModule {}

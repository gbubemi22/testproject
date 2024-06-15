import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaService } from './prisma_service/prisma.service';
import { UserResolver } from './graphql/user/user.resolver';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma_service/prisma.module';
import { AuthService } from './auth/feature/v1/service/auth.service';
import BcryptUtil from './utils/bcrypt.util';
import { JwtService } from '@nestjs/jwt';
import AuthRepository from './auth/feature/v1/repository/auth.repository';
import { RedisService } from './redis/redis.service';
import { LogService } from './logger/logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    PrismaModule.registerAsync(),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    UserResolver,
    AuthService,
    BcryptUtil,
    JwtService,
    AuthRepository,
    RedisService,
    LogService,
  ],
})
export class AppModule {}

import { Module, Global, DynamicModule } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({})
export class PrismaModule {
  static registerAsync(): DynamicModule {
    return {
      module: PrismaModule,
      providers: [
        {
          provide: PrismaService,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          useFactory: async (configService: ConfigService) => {
            return new PrismaService();
          },
          inject: [ConfigService],
        },
      ],
      exports: [PrismaService],
    };
  }
}

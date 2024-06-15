import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { DecodedToken } from '../interface/decoded-token.interface';

@Injectable()
export default class AuthRepository {
  constructor(private readonly redisService: RedisService) {}

  async createSession(userId: number, payload: DecodedToken) {
    const key = `auth:sessions:${userId}`;

    const currentSession = await this.redisService.get({ key });

    if (currentSession) {
      // Logout current active session
      await this.redisService.remove({ key });
    }

    await this.redisService.set({
      key,
      value: payload,
      ttl: 60 * 60 * 24, // 24 hours
    });

    return userId;
  }

  async getSession(userId: number) {
    const key = `auth:sessions:${userId}`;
    const session = await this.redisService.get({ key });

    if (!session || session === '') return false;

    return session;
  }

  async deleteSession(userId: string) {
    const key = `auth:sessions:${userId}`;

    await this.redisService.remove({ key });

    return true;
  }
}

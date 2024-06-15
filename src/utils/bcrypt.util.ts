import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class BcryptUtil {
  async hash(string: string): Promise<string> {
    const hashed = await bcrypt.hash(string, 10);
    return hashed;
  }

  async compare(string: string, hash: string): Promise<boolean> {
    const isPasswordValid = await bcrypt.compare(string, hash);
    return isPasswordValid;
  }
}

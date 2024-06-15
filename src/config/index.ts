import * as dotenv from 'dotenv';

dotenv.config();

export const configs = {
  JWT_SECRET: process.env.JWT_SECRET || 'test',
};

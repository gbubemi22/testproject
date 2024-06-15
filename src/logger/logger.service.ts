import * as winston from 'winston';
import SentryTransport from 'winston-sentry-log';

export class LogService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.json(),
      transports: [this.commonAppLogTransport],
    });

    if (process.env.NODE_ENV === 'production') {
      this.logger.add(
        new SentryTransport({
          // Correct instantiation of SentryTransport
          sentry: {
            dsn: process.env.SENTRY_DSN,
          },
        }),
      );
    }
  }

  private commonAppLogTransport = new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
  });

  error(error: any) {
    return this.logger.error(error.message ?? error);
  }

  info(msg: string) {
    return this.logger.info(msg);
  }

  obj(obj: any) {
    return this.logger.info(JSON.stringify(obj));
  }

  errorObj(errorObj: any) {
    return this.logger.error(JSON.stringify(errorObj));
  }
}

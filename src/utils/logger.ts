import { Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import { transports, createLogger, format } from 'winston';

@Injectable()
export class WinstonLogger implements LoggerService {
  private logger;

  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
      ),
      transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/app.log' }),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
      ],
    });
  }

  log(message: any, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, exception: string, trace?: any, context?: string) {
    this.logger.error(message, { exception, trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context });
  }
}
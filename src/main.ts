import { ValidationPipe } from '@nestjs/common';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';

import { AppModule } from './app.module';
import { WinstonLogger } from './utils/logger';
import { AllExceptionsFilter } from 'src/utils/errorHandler';

async function bootstrap() {
  const PORT = process.env.PORT || 1111;
  const exceptionLogger = new WinstonLogger();

  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useLogger(exceptionLogger);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
  await app.listen(PORT);
}
bootstrap();

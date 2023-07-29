import { AbstractHttpAdapter } from '@nestjs/core';
import { QueryFailedError, TransactionNotStartedError, TypeORMError } from 'typeorm';
import {
    Catch,
    HttpStatus,
    ArgumentsHost,
    HttpException,
    ExceptionFilter,
    NotFoundException,
    ForbiddenException,
    BadRequestException,
    GatewayTimeoutException,
} from '@nestjs/common';

import { WinstonLogger } from './logger';
import { RESPONSE_MESSAGES } from './responses';


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

  private logger;

  constructor(private readonly httpAdapterHost: AbstractHttpAdapter) {
    this.logger = new WinstonLogger();
  }

  catch(exception: any, host: ArgumentsHost): void {
    const httpAdapter = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let { responseErrorMessage, responseErrorCode } = this.errorCreation(exception)
    this.logger.error(responseErrorMessage, exception?.message, exception?.stack);

    const responseBody = {
      statusCode: responseErrorCode,
      message: responseErrorMessage,
      error: exception?.stack || null,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      method: httpAdapter.getRequestMethod(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, responseErrorCode);
  }

  errorCreation(exception: any) {
    let responseErrorCode: number;
    let responseErrorMessage = exception?.message;

    if(exception instanceof NotFoundException) {
      responseErrorCode = HttpStatus.NOT_FOUND;
    } else if(exception instanceof GatewayTimeoutException) {
      responseErrorCode = HttpStatus.GATEWAY_TIMEOUT;
    } else if(exception instanceof BadRequestException) {
      responseErrorCode = HttpStatus.BAD_REQUEST;
      responseErrorMessage = exception?.getResponse();
      responseErrorMessage = responseErrorMessage?.message ? responseErrorMessage.message : exception.message;
    } else if(exception instanceof QueryFailedError) {
      responseErrorCode = HttpStatus.EXPECTATION_FAILED;
    } else if(exception instanceof ForbiddenException) {
      responseErrorCode = HttpStatus.FORBIDDEN;
    } else if(exception instanceof TypeORMError) {
      responseErrorCode = HttpStatus.INTERNAL_SERVER_ERROR;
    } else {
      responseErrorCode = exception.getStatus?.() ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return { responseErrorMessage, responseErrorCode }
  }
}

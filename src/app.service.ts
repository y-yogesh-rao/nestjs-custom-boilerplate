import { Injectable } from '@nestjs/common';

import { ApiResponse } from './utils/types';
import { RESPONSE_MESSAGES, STATUS_CODES } from './utils/responses';

@Injectable()
export class AppService {
  getHello(): ApiResponse {
    return {
      statusCode: STATUS_CODES.OK,
      message: RESPONSE_MESSAGES.SUCCESS.APPLICATION_STARTED,
      data: `Environment test variable: ${process.env.TEST_ENV_VARIABLE}`,
    };
  }
}

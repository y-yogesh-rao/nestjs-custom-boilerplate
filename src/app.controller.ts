import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { ApiResponse } from './utils/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): ApiResponse {
    return this.appService.getHello();
  }
}

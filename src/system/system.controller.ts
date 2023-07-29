import { Controller, Get, Res } from '@nestjs/common';

import { SystemService } from './system.service';
import { Response } from 'express';

@Controller('system')
export class SystemController {

    constructor(private readonly systemService: SystemService) {}

    @Get('initialize')
    async getUsers(@Res() res: Response) {
        const serviceResponse = await this.systemService.initializeSystem();
        return res.status(serviceResponse.statusCode).json({...serviceResponse});
    }

}

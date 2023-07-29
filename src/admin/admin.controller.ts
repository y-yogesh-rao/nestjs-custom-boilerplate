import { Response } from 'express';
import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/utils/guards';
import { AdminService } from './admin.service';
import { ListUsersDto } from 'src/user/dto/ListUserDto.dto';

@Controller('')
export class AdminController {

    constructor(private readonly adminService: AdminService) {}

    @Get('admin/users')
    @UseGuards(new AuthGuard(['admin']))
    @UseGuards(AuthGuard)
    async getUsers(@Res() res: Response, @Query() query: ListUsersDto) {
        const serviceResponse = await this.adminService.getUsers(query);
        return res.status(serviceResponse.statusCode).json({...serviceResponse});
    }

}

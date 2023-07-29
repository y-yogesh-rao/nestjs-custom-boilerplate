import { Response } from 'express';
import { Controller, Get, Post, Req, Res, Body, UseGuards, Put } from '@nestjs/common';

import { UserService } from './user.service';
import { AuthGuard } from 'src/utils/guards';
import { ExpressRequest } from 'src/utils/interfaces';
import { UpdateUserDto } from './dto/UpdateUserDto.dto';
import { ChangePasswordDto } from './dto/ChangePasswordDto.dto';

@Controller('')
export class UserController {

    constructor (private readonly userService: UserService) {}

    @Get('user/profile')
    @UseGuards(AuthGuard)
    async getUserProfile(@Req() req: ExpressRequest, @Res() res: Response) {
        const serviceResponse = await this.userService.getUserProfile(req?.user?.id);
        return res.status(serviceResponse.statusCode).json({...serviceResponse});
    }

    @Post('user/change-password')
    @UseGuards(AuthGuard)
    async changePassword(@Req() req: ExpressRequest, @Body() changePasswordDto: ChangePasswordDto, @Res() res: Response) {
        const serviceResponse = await this.userService.changePassword(req.user.id, changePasswordDto);
        return res.status(serviceResponse.statusCode).json({...serviceResponse});
    }

    @Put('user')
    @UseGuards(AuthGuard)
    async updateUser(@Req() req: ExpressRequest, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
        const serviceResponse = await this.userService.updateUserProfile(req.user.id, updateUserDto);
        return res.status(serviceResponse.statusCode).json({...serviceResponse});
    }
}

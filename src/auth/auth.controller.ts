import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/LoginDto.dto';
import { RegisterUserDto } from './dto/RegisterUserDto.dto';
import { VerifyUserDto } from './dto/VerifyUserDto.dto';
import { Response } from 'express';

@Controller('')
export class AuthController {

    constructor (private readonly userService: AuthService) {}

    @Get('auth/login')
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        const serviceResponse = await this.userService.login(loginDto);
        return res.status(serviceResponse.statusCode).json({...serviceResponse});
    }

    @Post('auth/register')
    async registerUser(@Body() registerUserDto: RegisterUserDto, @Res() res: Response) {
        const serviceResponse = await this.userService.registerUser(registerUserDto);
        return res.status(serviceResponse.statusCode).json({...serviceResponse});
    }

    @Post('auth/verify')
    async verifyRegisteredUser(@Body() verifyUserDto: VerifyUserDto, @Res() res: Response) {
        const serviceResponse = await this.userService.verifyRegisteredUser(verifyUserDto);
        return res.status(serviceResponse.statusCode).json({...serviceResponse});
    }
}

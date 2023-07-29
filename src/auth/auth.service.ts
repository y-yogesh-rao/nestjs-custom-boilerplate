import { compare } from 'bcrypt';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, Injectable } from '@nestjs/common';

import { LoginDto } from './dto/LoginDto.dto';
import { ApiResponse } from 'src/utils/types';
import { VerifyUserDto } from './dto/VerifyUserDto.dto';
import { RegisterUserDto } from './dto/RegisterUserDto.dto';
import { Token, User } from 'src/database/models/user.entity';
import { DEFAULT_ROLE_IDS, TOKEN_TYPE } from 'src/utils/constants';
import { RESPONSE_MESSAGES, STATUS_CODES } from 'src/utils/responses';
import { generateOtp, signToken, verifyJwtToken } from 'src/utils/helperFunctions';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Token)
        private readonly tokenRepository: Repository<Token>,
    ) {}

    private formatUserResponse(user: User): any {
        let scopes = [user?.role?.name];
        const permissions = user?.role?.permissions.map(permission => permission?.permissionCode);
        
        scopes = scopes.concat(permissions);
        
        if(user?.password) delete user.password;
        if(user?.role?.permissions) delete user.role.permissions;
        
        return {
            ...user, scopes,
            accessToken: signToken({ scopes, id: user?.id, timestamp: new Date().toISOString() })
        }
    }

    async registerUser(registerUserDto: RegisterUserDto): Promise<ApiResponse> {
        const email = registerUserDto?.email;
        const userExists = await this.userRepository.findOne({ where: { email } });
        if(userExists) {
            throw new HttpException(RESPONSE_MESSAGES.ERROR.USER_ALREADY_EXISTS, STATUS_CODES.CONFLICT);
        }

        let type = TOKEN_TYPE.REGISTRATION;
        let token = signToken({ type, email, password: registerUserDto?.password });
        const tokenObject = {
            type, token, email,
            code: generateOtp(),
        }

        await this.tokenRepository.upsert(tokenObject, { conflictPaths: ['email', 'type'] });

        return {
            statusCode: STATUS_CODES.OK,
            message: RESPONSE_MESSAGES.SUCCESS.REGISTRATION_OTP_SENT,
        }
    }

    async login(loginDto: LoginDto): Promise<ApiResponse> {
        const userExists = await this.userRepository.findOne({ 
            where: { email: loginDto?.email },
            relations: {
                role: {
                    permissions: true
                }
            },
            select: {
                id: true,
                email: true,
                password: true,
                username: true,
                bio: true,
                profileImageId: true,
                isEmailVerified: true,
                role: {
                    id: true,
                    name: true,
                    permissions: {
                        id: true,
                        permissionCode: true
                    }
                }
            },
        });
        if(!userExists) {
            throw new HttpException(RESPONSE_MESSAGES.ERROR.USER_WITH_PROVIDED_EMAIL_NOT_FOUND, STATUS_CODES.NOT_FOUND);
        }

        const isPasswordCorrect = await compare(loginDto.password, userExists.password);
        if(!isPasswordCorrect) {
            throw new HttpException(RESPONSE_MESSAGES.ERROR.INCORRECT_PASSWORD, STATUS_CODES.UNAUTHENTICATED);
        }

        let responseData = this.formatUserResponse(userExists);

        return {
            data: responseData,
            statusCode: STATUS_CODES.OK,
            message: RESPONSE_MESSAGES.SUCCESS.AUTHENTICATION_SUCCESSFUL,
        }
    }

    async verifyRegisteredUser(verifyUserDto: VerifyUserDto): Promise<ApiResponse> {
        const tokenExists = await this.tokenRepository.findOne({ where: { token: verifyUserDto?.token } });
        if(!tokenExists) {
            throw new HttpException(RESPONSE_MESSAGES.ERROR.INVALID_TOKEN_PROVIDED, STATUS_CODES.BAD_REQUEST);
        }

        const { success, data } = verifyJwtToken(verifyUserDto?.token);
        if(!success) {
            throw new HttpException(RESPONSE_MESSAGES.ERROR.INVALID_TOKEN_PROVIDED, STATUS_CODES.BAD_REQUEST);
        }

        if(verifyUserDto?.code !== tokenExists?.code) {
            throw new HttpException(RESPONSE_MESSAGES.ERROR.INVALID_OTP_PROVIDED, STATUS_CODES.BAD_REQUEST);
        }

        const newUser = new User();
        Object.assign(newUser, { 
            email: data?.email, 
            password: data?.password,
            roleId: DEFAULT_ROLE_IDS.USER,
        })
        
        const createdUser = await this.userRepository.save(newUser);
        const responseData = this.formatUserResponse(createdUser);

        await this.tokenRepository.delete({ id: tokenExists?.id });

        return {
            data: responseData,
            statusCode: STATUS_CODES.CREATED,
            message: RESPONSE_MESSAGES.SUCCESS.USER_REGISTERED_SUCCESSFULLY,
        }
    }
}

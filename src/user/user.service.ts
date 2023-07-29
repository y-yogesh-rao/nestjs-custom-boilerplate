import { compare } from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, Injectable } from '@nestjs/common';

import { User, UserSetting } from 'src/database/models/user.entity';
import { UpdateUserDto } from './dto/UpdateUserDto.dto';
import { ApiResponse, UserSettingCode } from 'src/utils/types';
import { ChangePasswordDto } from './dto/ChangePasswordDto.dto';
import { RESPONSE_MESSAGES, STATUS_CODES } from 'src/utils/responses';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(UserSetting)
        private readonly userSettingRepository: Repository<UserSetting>
    ) {}

    async getUserSettings(userId: number): Promise<UserSettingCode[]> {
        const userSettings = await this.userSettingRepository.find({ where: { userId }, relations: { setting: true } });
        return userSettings.map(userSetting => {
            return { code: userSetting.setting.code, enabled: userSetting.enabled }
        })
    }

    async findById(userId: number): Promise<User> {
        return this.userRepository.findOne({ where: { id: userId } });
    }

    async getUserProfile(userId: number): Promise<ApiResponse> {
        const responseData = await this.userRepository.findOne({ 
            where: { id: userId },
            relations: { role: true },
            select: { 
                role: {
                    id: true,
                    name: true,
                }
            }
        })

        return {
            data: responseData,
            statusCode: STATUS_CODES.OK,
            message: RESPONSE_MESSAGES.SUCCESS.REQUEST_SUCCESSFUL,
        }
    }

    async changePassword(userId: number, changePasswordDto: ChangePasswordDto): Promise<ApiResponse> {
        const userDetails = await this.userRepository.findOne({ 
            where: { id: userId },
            select: ['id', 'bio', 'email', 'password'],
        });
        if(!userDetails) {
            throw new HttpException(RESPONSE_MESSAGES.ERROR.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
        }

        if(changePasswordDto.newPassword !== changePasswordDto.confirmNewPassword) {
            throw new HttpException(RESPONSE_MESSAGES.ERROR.NEW_PASSWORDS_MISMATCH, STATUS_CODES.BAD_REQUEST);
        }

        if(changePasswordDto.oldPassword === changePasswordDto.newPassword) {
            throw new HttpException(RESPONSE_MESSAGES.ERROR.PASSWORD_MISMATCH, STATUS_CODES.BAD_REQUEST);
        }

        const isOldPasswordCorrect = await compare(changePasswordDto.oldPassword, userDetails.password);
        if(!isOldPasswordCorrect) {
            throw new HttpException(RESPONSE_MESSAGES.ERROR.INCORRECT_OLD_PASSWORD, STATUS_CODES.UNAUTHENTICATED);
        }

        userDetails.password = changePasswordDto.newPassword;
        await this.userRepository.update({ id: userId }, userDetails);

        return {
            data: null,
            statusCode: STATUS_CODES.OK,
            message: RESPONSE_MESSAGES.SUCCESS.PASSWORD_CHANGED_SUCCESSFULLY,
        }
    }

    async updateUserProfile(userId: number, updateUserDto: UpdateUserDto): Promise<ApiResponse> {
        const userExists = await this.userRepository.findOne({ where: { id: userId } });
        if(!userExists) {
            throw new HttpException(RESPONSE_MESSAGES.ERROR.USER_NOT_FOUND, STATUS_CODES.NOT_FOUND);
        }

        let updationObject = {};
        if(updateUserDto?.bio) updationObject['bio'] = updateUserDto.bio;
        if(updateUserDto?.gender) updationObject['gender'] = updateUserDto.gender;
        if(updateUserDto?.lastName) updationObject['lastName'] = updateUserDto.lastName;
        if(updateUserDto?.username) updationObject['username'] = updateUserDto.username;
        if(updateUserDto?.firstName) updationObject['firstName'] = updateUserDto.firstName;
        if(updateUserDto?.middleName) updationObject['middleName'] = updateUserDto.middleName;
        if(updateUserDto?.countryCode) updationObject['countryCode'] = updateUserDto.countryCode;
        if(updateUserDto?.phoneNumber) updationObject['phoneNumber'] = updateUserDto.phoneNumber;
        if(updateUserDto?.profileImageId) updationObject['profileImageId'] = updateUserDto.profileImageId;

        await this.userRepository.update({ id: userId }, updationObject);

        return {
            data: null,
            statusCode: STATUS_CODES.OK,
            message: RESPONSE_MESSAGES.SUCCESS.USER_PROFILE_UPDATE_SUCCESSFULLY,
        }
    }
}

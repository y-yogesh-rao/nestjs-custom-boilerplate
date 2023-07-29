import { IsNotEmpty, MinLength } from "class-validator"

import { PASSWORD_MINIMUM_LENGTH } from "src/utils/constants"

export class ChangePasswordDto {
    @IsNotEmpty()
    oldPassword: string

    @IsNotEmpty()
    @MinLength(PASSWORD_MINIMUM_LENGTH)
    newPassword: string

    @IsNotEmpty()
    confirmNewPassword: string
}
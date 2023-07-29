import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

import { VALIDATION_ERRORS } from "src/utils/responses";
import { PASSWORD_MINIMUM_LENGTH } from "src/utils/constants";

export class RegisterUserDto {
    @IsNotEmpty()
    @IsEmail({}, { message: VALIDATION_ERRORS.INVALID_EMAIL })
    email: string;

    @IsNotEmpty()
    @MinLength(PASSWORD_MINIMUM_LENGTH)
    password: string;
}
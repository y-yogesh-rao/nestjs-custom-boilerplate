import { IS_LENGTH, IsNotEmpty, Length, MaxLength } from "class-validator";

import { DEFAULT_OTP_LENGTH } from "src/utils/constants";

export class VerifyUserDto {
    @IsNotEmpty()
    token: string;

    @IsNotEmpty()
    @Length(DEFAULT_OTP_LENGTH)
    code: string;
}
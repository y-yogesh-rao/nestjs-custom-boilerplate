import { Request } from "express";

import { UserSettingCode } from "./types";
import { User } from "src/database/models/user.entity";

export interface ExpressRequest extends Request {
    user?: User,
    userScopes?: string[],
    userSettings?: UserSettingCode[],
}
import { verify } from 'jsonwebtoken';
import { HttpException, Injectable, NestMiddleware } from "@nestjs/common";

import { ExpressRequest } from "./interfaces";
import { NextFunction, Response } from "express";
import { UserService } from 'src/user/user.service';
import { verifyJwtToken } from './helperFunctions';
import { RESPONSE_MESSAGES, STATUS_CODES } from './responses';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(private readonly userService: UserService) {}

    async use(req: ExpressRequest, res: Response, next: NextFunction) {
        if(!req.headers.authorization) {
            req.user = null;
            next();
            return;
        }

        const providedToken = req.headers.authorization.split(' ')[1];
        try {
            let decodedData = verifyJwtToken(providedToken);
            if(!decodedData.success) {
                throw new HttpException(RESPONSE_MESSAGES.ERROR.INVALID_TOKEN_PROVIDED, STATUS_CODES.BAD_REQUEST);
            }

            decodedData = decodedData?.data;
            const userDetails = await this.userService.findById(decodedData.id);
            const userSettings = await this.userService.getUserSettings(decodedData.id);
            
            req.user = userDetails;
            req.userSettings = userSettings;
            req.userScopes = decodedData?.scopes;
            next();
        } catch(error) {
            console.log(error)
            req.user = null;
            next();
        }
    }
}
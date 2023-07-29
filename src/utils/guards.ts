import { Observable } from "rxjs";
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from "@nestjs/common";

import { ExpressRequest } from "./interfaces";
import { RESPONSE_MESSAGES } from "./responses";
import { isAuthorizedUser } from "./helperFunctions";

export class AuthGuard implements CanActivate {

    constructor(private readonly allowedScopes: string[] = []) {}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<ExpressRequest>();

        if(request.headers.authorization?.split?.(' ')?.[1] === undefined) {
            throw new BadRequestException(RESPONSE_MESSAGES.ERROR.YOU_NEED_TO_PROVIDE_ACCESS_TOKEN);
        }

        if(!request.user || !request.userScopes) {
            throw new UnauthorizedException(RESPONSE_MESSAGES.ERROR.INVALID_ACCESS_TOKEN);
        }

        if(!isAuthorizedUser(this.allowedScopes, request.userScopes)) {
            throw new ForbiddenException(RESPONSE_MESSAGES.ERROR.YOU_ARE_NOT_AUTHORIZED);
        }

        return true;
    }
}
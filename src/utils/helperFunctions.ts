import slugify from "slugify";
import { sign, verify } from 'jsonwebtoken';

import { PaginationMetaData } from "./types";
import { DEFAULT_OTP_LENGTH, JWT_TOKEN_EXPIRES_IN_SECONDS, SLUG_RANDOM_STRING_LENGTH } from "./constants";


export const signToken = (payload, expiresIn = JWT_TOKEN_EXPIRES_IN_SECONDS): string => {
    return sign(payload, process.env.JWT_SECRET, { expiresIn });
}

export const generateRandomString = (length: number): string => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
  
    return result;
}

export const slugifyText = (text: string): string => {
    return slugify(text, { lower: true }) + '-' + generateRandomString(SLUG_RANDOM_STRING_LENGTH);
}

export const getPaginationMetaData = (limit: number, pageNumber: number, dataCount: number): PaginationMetaData => {
    const completePagesCount = Math.floor(dataCount / limit);
    const totalPages = (dataCount % limit === 0) ? completePagesCount : completePagesCount + 1;
    return {
        perPage: limit,
        totalPages, pageNumber,
        totalDataCount: dataCount,
    }
}

export const generateOtp = (requestedlength: number = DEFAULT_OTP_LENGTH) => {
    let generatedOtp = '';
    const characters = '1234567890';
    for (let i = 0; i < requestedlength; i++) {
      const value = Math.floor(Math.random() * characters.length);
      generatedOtp += characters.substring(value, value + 1).toUpperCase();
    }
    return generatedOtp;
}

export const verifyJwtToken = (token: string): any => {
    try {
        const data = verify(token, process.env.JWT_SECRET);
        return { success: true, data };
    } catch(error) {
        return { success: false, data: null }
    }
}

export const isAuthorizedUser = (allowedScopes: string[], userScopes: string[]) => {
    if(allowedScopes.length === 0) return true;
    return userScopes.some((userScope) => allowedScopes.includes(userScope));
}
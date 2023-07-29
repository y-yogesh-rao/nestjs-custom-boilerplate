import { HttpStatus } from '@nestjs/common';

export const STATUS_CODES = {
    // 2xx
    OK: HttpStatus.OK,
    CREATED: HttpStatus.CREATED,
    ACCEPTED: HttpStatus.ACCEPTED,
    NO_CONTENT: HttpStatus.NO_CONTENT,
    PARTIAL_CONTENT: HttpStatus.PARTIAL_CONTENT,

    // 4xx
    CONFLICT: HttpStatus.CONFLICT,
    NOT_FOUND: HttpStatus.NOT_FOUND,
    UNAUTHORIZED: HttpStatus.FORBIDDEN,
    BAD_REQUEST: HttpStatus.BAD_REQUEST,
    UNAUTHENTICATED: HttpStatus.UNAUTHORIZED,
    NOT_ACCEPTABLE: HttpStatus.NOT_ACCEPTABLE,
    REQUEST_TIMEOUT: HttpStatus.REQUEST_TIMEOUT,
    PAYMENT_REQUIRED: HttpStatus.PAYMENT_REQUIRED,
    TOO_MANY_REQUESTS: HttpStatus.TOO_MANY_REQUESTS,
    PAYLOAD_TOO_LARGE: HttpStatus.PAYLOAD_TOO_LARGE,
    VALIDATION_ERROR: HttpStatus.EXPECTATION_FAILED,
    METHOD_NOT_ALLOWED: HttpStatus.METHOD_NOT_ALLOWED,
    UNPROCESSABLE_ENTITY: HttpStatus.UNPROCESSABLE_ENTITY,
    UNSUPPORTED_MEDIA_TYPE: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    
    // 5xx
    BAD_GATEWAY: HttpStatus.BAD_GATEWAY,
    GATEWAY_TIMEOUT: HttpStatus.GATEWAY_TIMEOUT,
    NOT_IMPLEMENTED: HttpStatus.NOT_IMPLEMENTED,
    SERVICE_UNAVAILABLE: HttpStatus.SERVICE_UNAVAILABLE,
    INTERNAL_SERVER_ERROR: HttpStatus.INTERNAL_SERVER_ERROR,
}

export const RESPONSE_MESSAGES = {
    ERROR: {
        UNKNOWN_ERROR: 'Unknown error',
        USER_NOT_FOUND: 'User doesn\'t exists',
        TOKEN_NOT_FOUND: 'Token doesn\'t exists',
        USER_ALREADY_EXISTS: 'User already exists',
        INVALID_OTP_PROVIDED: 'Invalid otp provided',
        INVALID_TOKEN_PROVIDED: 'Invalid token provided',
        INTERNAL_SERVER_ERROR: 'Oops! Something went wrong',
        INVALID_ACCESS_TOKEN: 'Invalid access token provided',
        SYSTEM_ALREADY_INITIALIZED: 'System already initialized',
        INCORRECT_PASSWORD: 'Incorrect passowrd! Please try again!',
        PASSWORD_MISMATCH: 'Old and new password should not be same',
        INCORRECT_OLD_PASSWORD: 'Incorrect old passowrd! Please try again!',
        NEW_PASSWORDS_MISMATCH: 'Password and confirm password did not match!',
        YOU_ARE_NOT_AUTHORIZED: 'You are not authorized to access this endpoint',
        USER_WITH_PROVIDED_EMAIL_NOT_FOUND: 'User with provided email not found',
        YOU_NEED_TO_PROVIDE_ACCESS_TOKEN: 'You need to provide access token access this endpoint',
    },
    SUCCESS: {
        REQUEST_SUCCESSFUL: 'Request successful',
        TAG_CREATED_SUCCESSFULLY: 'Tag created successfully',
        AUTHENTICATION_SUCCESSFUL: 'Authentication successful',
        APPLICATION_STARTED: 'Application started successfully',
        REGISTRATION_OTP_SENT: 'Registration OTP sent successfully',
        ARTICLE_CREATED_SUCCESSFULLY: 'Article created successfully',
        USER_REGISTERED_SUCCESSFULLY: 'User registered successfully',
        PASSWORD_CHANGED_SUCCESSFULLY: 'Password changed successfully',
        SYSTEM_INITIALIZED_SUCCESSFULLY: 'System initialized successfully',
        USER_PROFILE_UPDATE_SUCCESSFULLY: 'User profile updated successfully',
    }
}

export const VALIDATION_ERRORS = {
    INVALID_EMAIL: 'email must be a valid email'
}
/**
 * Pagination settings
 */
export const DEFAULT_OTP_LENGTH = 6;
export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_PAGINATION_LIMIT = 20;
export const PAGINATION_LIMIT_MAX_CAP = 50;
export const DEFAULT_ORDER_BY_VALUE = 'DESC';
export const DEFAULT_ORDER_BY_PARAMETER = 'createdAt';

/**
 * Authentication settings
 */
export const PASSWORD_MINIMUM_LENGTH = 8;
export const JWT_TOKEN_EXPIRES_IN_SECONDS = 1000 * 60 * 60 * 24;                // 1 Day

/**
 * Other settings
 */
export const SLUG_RANDOM_STRING_LENGTH = 6;
export const STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    USER: {
        ACTIVE: 'active',
        BLOCKED: 'blocked',
        DEACTIVATED: 'deactivated',
    },
}

export const TOKEN_TYPE = {
    CHANGE_EMAIL: 'changeEmail',
    REGISTRATION: 'registration',
    FORGET_PASSWORD: 'forgetPassword',
}

export const DEFAULT_ROLE_IDS = {
    ADMIN: 1,
    USER: 2,
}

export const SETTING_TYPE = {
    THEME: 'theme',
    GHOST_MODE: 'ghost-mode',
    PUSH_NOTIFICATION: 'push-notification',
    EMAIL_NOTIFICATION: 'email-notification',
}
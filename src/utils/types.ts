type ApiError = {
    error?: string,
    message?: string,
}

export type ApiResponse = {
    data?: any,
    message: string,
    error?: ApiError,
    statusCode: number,
}

export type PaginationMetaData = {
    perPage: number,
    pageNumber: number,
    totalPages: number,
    totalDataCount: number,
}

export type UserSettingCode = {
    code: string,
    enabled: boolean,
}
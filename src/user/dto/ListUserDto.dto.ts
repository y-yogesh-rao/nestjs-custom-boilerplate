import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

import { DEFAULT_ORDER_BY_VALUE, DEFAULT_PAGE_NUMBER, DEFAULT_PAGINATION_LIMIT } from '../../utils/constants';

export class ListUsersDto {
    @IsOptional()
    @IsString()
    search: string;

    @Transform(({value}) => parseFloat(value))
    @IsInt()
    @IsPositive()
    limit: number = DEFAULT_PAGINATION_LIMIT;

    @Transform(({value}) => parseFloat(value))
    @IsInt()
    @IsPositive()
    pageNumber: number = DEFAULT_PAGE_NUMBER;

    @IsOptional()
    @IsString()
    orderByParameter: string;

    @Transform(({value}) => value.toUpperCase())
    @IsIn(['DESC','ASC'])
    orderByValue: any = DEFAULT_ORDER_BY_VALUE;
}
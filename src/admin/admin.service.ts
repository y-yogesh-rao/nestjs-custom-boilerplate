import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ApiResponse } from 'src/utils/types';
import { User } from 'src/database/models/user.entity';
import { ListUsersDto } from 'src/user/dto/ListUserDto.dto';
import { getPaginationMetaData } from 'src/utils/helperFunctions';
import { RESPONSE_MESSAGES, STATUS_CODES } from 'src/utils/responses';
import { DEFAULT_ORDER_BY_PARAMETER, DEFAULT_ORDER_BY_VALUE, DEFAULT_ROLE_IDS, PAGINATION_LIMIT_MAX_CAP } from 'src/utils/constants';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async getUsers(query: ListUsersDto): Promise<ApiResponse> {
        const limit = query?.limit > PAGINATION_LIMIT_MAX_CAP ? PAGINATION_LIMIT_MAX_CAP : query?.limit;
        const offset = (query?.pageNumber - 1) * limit;

        const orderByValue = query?.orderByValue || DEFAULT_ORDER_BY_VALUE;
        const orderByParameter = query?.orderByParameter || DEFAULT_ORDER_BY_PARAMETER;

        const queryBuilder = this.userRepository.createQueryBuilder('users')
            .where('users.roleId = :userRoleId', { userRoleId: DEFAULT_ROLE_IDS.USER })

        if(query?.search) {
            queryBuilder.andWhere('users.username LIKE :search', { search: `%${query?.search}%` })
        }
        
        const [articles, articlesCount] = await queryBuilder
            .take(limit)
            .skip(offset)
            .orderBy(`users.${orderByParameter}`, orderByValue)
            .getManyAndCount();

        return {
            statusCode: STATUS_CODES.OK,
            data: {
                rows: articles,
                paginationData: getPaginationMetaData(limit, query?.pageNumber, articlesCount)
            },
            message: RESPONSE_MESSAGES.SUCCESS.REQUEST_SUCCESSFUL,
        }
    }
}

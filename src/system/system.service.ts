import { Repository } from 'typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ApiResponse } from 'src/utils/types';
import { Role } from 'src/database/models/role.entity';
import { User, UserSetting } from 'src/database/models/user.entity';
import { Setting } from 'src/database/models/setting.entity';
import { Permission } from 'src/database/models/permission.entity';
import { DEFAULT_ROLE_IDS, SETTING_TYPE } from 'src/utils/constants';
import { RESPONSE_MESSAGES, STATUS_CODES } from 'src/utils/responses';

@Injectable()
export class SystemService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        @InjectRepository(Setting)
        private readonly settingRepository: Repository<Setting>,
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
        @InjectRepository(UserSetting)
        private readonly userSettingRepository: Repository<UserSetting>,
    ) {}

    async initializeSystem(): Promise<ApiResponse> {
        const roleExists = await this.roleRepository.findOne({ where: { name: 'admin' } });
        if(roleExists) {
            throw new HttpException(RESPONSE_MESSAGES.ERROR.SYSTEM_ALREADY_INITIALIZED, STATUS_CODES.BAD_REQUEST);
        }

        /**
         * Initializing default permissions
         */
        let permissions = [
            { permissionCode: 'manage-users' },
            { permissionCode: 'manage-roles' },
            { permissionCode: 'manage-profile' },
            { permissionCode: 'manage-payments' },
        ]

        permissions = permissions.map(permission => {
            const newPermission = new Permission();
            Object.assign(newPermission, permission);
            return newPermission;
        })

        await this.permissionRepository.save(permissions);


        /**
         * Initializing default roles
         */
        const adminRole = new Role();
        Object.assign(adminRole, { name: 'admin', permissions });

        const userRole = new Role();
        Object.assign(userRole, { 
            name: 'user',
            permissions: [
                permissions[2],
            ]
        });

        await this.roleRepository.save([ adminRole, userRole ]);

        /**
         * Initializing settings
         */
        let settings = [
            { 
                name: 'Push notifications',
                code: 'push-notifications',
                type: SETTING_TYPE.PUSH_NOTIFICATION,
                description: 'By disabling this setting, you won\'t receive push notifications',
            },
            { 
                name: 'Email notifications',
                code: 'email-notifications',
                type: SETTING_TYPE.EMAIL_NOTIFICATION,
                description: 'By disabling this setting, you won\'t receive email notifications',
            },
            { 
                name: 'Ghost mode',
                code: 'ghost-mode',
                type: SETTING_TYPE.GHOST_MODE,
                description: 'By enabling this feature, nody will be able to see your location',
            },
            { 
                name: 'Enable dark theme',
                code: 'enable-dark-theme',
                type: SETTING_TYPE.THEME,
                description: 'By enabling this feature, you will experience application in dark theme',
            },
        ];

        settings = settings.map(setting => {
            const newSetting = new Setting()
            Object.assign(newSetting, setting);
            return newSetting;
        })

        const createdSettings = await this.settingRepository.save(settings);


        /**
         * Initializing default users
         */
        const adminUser = new User();
        Object.assign(adminUser, { 
            firstName: 'Admin',
            roleId: DEFAULT_ROLE_IDS.ADMIN,
            email: process.env.DEFAULT_ADMIN_EMAIL, 
            password: process.env.DEFAULT_ADMIN_PASSWORD,
        });

        const applicationUser = new User();
        Object.assign(applicationUser, { 
            firstName: 'User',
            roleId: DEFAULT_ROLE_IDS.USER,
            email: process.env.DEFAULT_USER_EMAIL, 
            password: process.env.DEFAULT_USER_PASSWORD,
        });

        const createdUsers = await this.userRepository.save([ adminUser, applicationUser ]);

        /**
         * Assigning user default settings
         */
        const userSettings = [];
        for(let createdUser of createdUsers) {
            for(let createdSetting of createdSettings) {
                const newUserSetting = new UserSetting();
                Object.assign(newUserSetting, { userId: createdUser.id, settingId: createdSetting.id })
                userSettings.push(newUserSetting);
            }
        }
        await this.userSettingRepository.save(userSettings);

        return {
            data: null,
            statusCode: STATUS_CODES.OK,
            message: RESPONSE_MESSAGES.SUCCESS.SYSTEM_INITIALIZED_SUCCESSFULLY,
        }
    }

}

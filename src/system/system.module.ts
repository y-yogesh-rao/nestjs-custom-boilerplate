import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SystemService } from './system.service';
import { SystemController } from './system.controller';
import { User, UserSetting } from 'src/database/models/user.entity';
import { Role } from 'src/database/models/role.entity';
import { Permission } from 'src/database/models/permission.entity';
import { Setting } from 'src/database/models/setting.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User, Role, Permission, Setting, UserSetting ])
  ],
  controllers: [ SystemController ],
  providers: [ SystemService ]
})

export class SystemModule {}

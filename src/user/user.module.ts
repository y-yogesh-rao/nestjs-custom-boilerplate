import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { AuthGuard } from 'src/utils/guards';
import { UserController } from './user.controller';
import { User, UserSetting } from 'src/database/models/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User, UserSetting ]),
  ],
  controllers: [ UserController ],
  providers: [ UserService, AuthGuard ]
})

export class UserModule {}

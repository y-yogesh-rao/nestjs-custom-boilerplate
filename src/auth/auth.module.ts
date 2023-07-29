import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Token, User } from 'src/database/models/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User, Token ])
  ],
  controllers: [ AuthController ],
  providers: [ AuthService ]
})

export class AuthModule {}

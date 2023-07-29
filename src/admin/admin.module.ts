import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { User } from 'src/database/models/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ User ])
  ],
  controllers: [AdminController],
  providers: [AdminService]
})

export class AdminModule {}

import databaseConfig from './database/config';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { UserService } from './user/user.service';
import { AdminModule } from './admin/admin.module';
import { AuthMiddleware } from './utils/middlewares';
import { SystemModule } from './system/system.module';
import { UserController } from './user/user.controller';
import { User, UserSetting } from './database/models/user.entity';

@Module({
  imports: [
    UserModule,
    RoleModule,
    AuthModule,
    SystemModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([ User, UserSetting ]),
    AdminModule,
  ],
  controllers: [ AppController, UserController ],
  providers: [ AppService, UserService ],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    })
  }
}

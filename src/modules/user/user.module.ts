import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceUser } from 'src/entities/device-user.entity';
import { LoginHistory } from 'src/entities/login-history.entity';
import { Role } from 'src/entities/role.entity';
import { User } from 'src/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, DeviceUser, LoginHistory])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserDtoConverter } from './converter/userDto.converter';
import { CreateUserDtoConverter } from './converter/createUserDto.converter';
import { UpdateUserDtoConverter } from './converter/updateUserDto.converter';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    UserDtoConverter,
    CreateUserDtoConverter,
    UpdateUserDtoConverter,
  ],
  controllers: [UserController],
  exports: [
    UserService,
    UserDtoConverter,
    CreateUserDtoConverter,
  ],
})
export class UserModule {}

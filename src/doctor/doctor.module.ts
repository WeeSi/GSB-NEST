import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    //On inject ici le module UsersModule qui nous permettra d'utiliser tous les services qu'il a exporté
    //UsersService, CreateUserDtoConverter, UpdateUserDtoConverter, UserDtoConverter, etc ...
    UserModule
  ],
  controllers: [DoctorController]
})
export class DoctorModule {}
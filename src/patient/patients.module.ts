import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PatientController } from './patient.controller';

@Module({
  imports: [
    //On inject ici le module UsersModule qui nous permettra d'utiliser tous les services qu'il a exporté
    //UsersService, CreateUserDtoConverter, UpdateUserDtoConverter, UserDtoConverter, etc ...
    UserModule
  ],
  controllers: [PatientController],
})
export class PatientModule {}
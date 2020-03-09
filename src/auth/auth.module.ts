import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './model/jwt.const';
import { AuthStrategy } from './strategy/auth.strategy';

@Module({
  imports: [
    // On inject ici le module UsesModule qui nous permettra d'utiliser tous les services qu'il a exporté
    // UsersService, CreateUserDtoConverter, UpdateUserDtoConverter, UserDtoConverter, etc ...
    UserModule,
    // On inject le module JwtModule comme préconisé sur la doc NestJs
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy]
})
export class AuthModule {}
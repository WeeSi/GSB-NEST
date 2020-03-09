import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { jwtConstants } from '../model/jwt.const';
import { User } from '../../user/user.entity';

/*
  Strategy d'authentification appelée 'auth' qui représenstera un utilisateur authentifié
  (cf. https://docs.nestjs.com/techniques/authentication)
*/
@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'auth') {
  constructor(
    private readonly authService: AuthService,
  ) {
    // Configuration de PassportStrategy utilisée pour JWT
    super({
      // Indication de l'endroit ou se trouve le token (ici dans le header de la requête)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 

      // L'expiration du token est prise en compte
      ignoreExpiration: false, 
      
      // La clef secrète de JWT pour encrypter le token
      secretOrKey: jwtConstants.secret, 
    });
  }

  /*
    Méthode qui sera appelée lorsque la strategie d'authentification auth sera spécifiée sur une route
  */
  async validate(payload: any): Promise<User> {
    // on délègue la validation de l'utilisateur au service d'authentification
    const user: User = await this.authService.validate(payload.id);

    // Si l'utilisateur n'est pas trouvé on déclenche une exception avec le statut 401
    if (!user) {
      throw new UnauthorizedException(); 
    }

    // Sinon on retourne l'utilisateur
    return user;
  }
}
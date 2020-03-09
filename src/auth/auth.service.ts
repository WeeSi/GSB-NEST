import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/model/user.dto';
import { UserDtoConverter } from '../user/converter/userDto.converter';

@Injectable()
export class AuthService {
    /**
     *
     * @param userService service qui permet de faire toutes les opérations relatives à la table User
     * @param jwtService service qui permet de profiter le bibliothèque Jwt
     * @param userDtoConverter service qui permet de convertir un User en UserDto (et inversement)
     */
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly userDtoConverter: UserDtoConverter,
    ) {}

    /**
     * Vérifie l'email et le mot de passe de l'utilisateur et renvoie le jeton de connexion de l'utilisateur.
     * Ce jeton contient une chaîne de caractères qui correspond aux informations de l'utilisateur.
     * 
     * @param { string } email email de l'utilisateur
     * @param { string } password mot de passe de l'utilisateur
     * @returns { {access_token: string;} } jeton utilisateur
     */
    async login(email: string, password: string): Promise<{access_token: string}> {
        const user: UserDto = this.userDtoConverter.convertOutbound( // Converti un User en UserDto
            // tslint:disable-next-line: max-line-length
            await this.userService.checkUserCredentials(email, password), // Appel de la méthode qui permet de vérifier les informations d'un utilisateur
        );

        return {
            access_token: this.jwtService.sign(user), // Assigne à la clef access_token les informations de l'utilisateur encryptées
        };
    }

    /**
     * Valide un utilisateur à aprtir de son id
     *
     * @param userId id utilisateur
     * @returns {User} Utilisateur correspondant
     */
    async validate(userId: number): Promise<User> {
        return await this.userService.getUserById(userId); //Récupère un utilisateur à partir de son id
    }
}
import { Body, Controller, Post, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiImplicitBody, ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { CheckCredentialDto } from '../user/model/checkCredential.dto';
import { UserDto } from '../user/model/user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { TokenDto } from './model/token.dto';
import { UserDtoConverter } from '../user/converter/userDto.converter';
import { CreateUserDtoConverter } from '../user/converter/createUserDto.converter';
import { CreateUserDto } from '../user/model/createUser.dto';
import { User } from '../user/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { editFileName } from '../utils/file-upload.utils';
import { imageFileFilter } from '../utils/file-upload.utils';


/**
 * @swagger
 * @ApiUseTags annotation swagger pour indiquer que ces routes appartiennent au controller AuthController
 * @ApiImplicitBody annotation swagger pour indiquer les paramètres qui doivent figurer dans le corp de la requête
 * @ApiImplicitParams annotation swagger pour indiquer les paramètres qui doivent figurer en chaîne de la requête
 * @ApiResponse annotation swagger pour indiquer la forme de la réponse
 */
@ApiUseTags('auth')
@Controller('auth')
export class AuthController {

    /**
     *
     * @param userService service qui permet de faire toutes les opérations relatives à la table User
     * @param authService service qui permet de faire toutes les opérations qui concernent l'authentification
     * @param userDtoConverter service qui permet de convertir un User en UserDto (et inversement)
     * @param createUserDtoConverter service qui permet de convertir un User en CreateUserDto (et inversement)
     */
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly userDtoConverter: UserDtoConverter,
        private readonly createUserDtoConverter: CreateUserDtoConverter,
    ) {}

    /**
     * Méthode POST sur la route /api/auth/login
     * Cette route permet de connecter un utilistaeur à la plateforme
     *
     * @param {CheckCredentialDto} credential objet qui contient les informations d'authentification de l'utilisateur
     * @returns {TokenDto} objet qui contient le jeton de connexion avec les informations utilisateurs encryptées
     */
    @Post('login')
    @ApiImplicitBody({name: 'CheckCredentialDto', description: 'User credential to check', type: CheckCredentialDto})
    @ApiResponse({status: 201, description: 'User authentificated token', type: TokenDto})
    async login(@Body() credential: CheckCredentialDto): Promise<TokenDto> {
        return this.authService.login(credential.email, credential.password);
    }

    /**
     * Méthode PUT sur la route /api/auth/signup
     * Cette route permet d'inscrire un utiulisateur à la plateforme
     *
     * @param {CreateUserDto} user objet qui contient les informations de l'utilisateur a créer
     * @returns {UserDto} objet qui contient les informations de l'utilisateur qui a été créé
     */
    @Put('signup')
    @ApiImplicitBody({name: 'CreateUserDto', description: 'User to create', type: CreateUserDto})
    @ApiResponse({status: 201, description: 'User created', type: UserDto})
    async signup(@Body() user: CreateUserDto): Promise<UserDto> {
        // On convertie l'utilisateur de type CreateUserDto en Partial<User>
        const userToCreate: Partial<User> = this.createUserDtoConverter.convertInbound(user);
        // On crée l'utilisateur en base
        const userCreated: User = await this.userService.createUser(userToCreate);
        // On retourne l'utilisateur créé convertie au format UserDto
        return this.userDtoConverter.convertOutbound(userCreated);
    }

}

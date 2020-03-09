import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { UserDtoConverter } from '../user/converter/userDto.converter';
import { UserDto } from '../user/model/user.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

/**
 * @swagger
 * @ApiUseTags annotation swagger pour indiquer que ces routes appartiennent au controller DoctorController
 * @ApiResponse annotation swagger pour indiquer la forme de la réponse
 */
@ApiUseTags('doctor')
@Controller('doctor')
export class DoctorController {

    /**
     * 
     * @param userService service qui permet de faire toutes les opérations relatives à la table User
     * @param userDtoConverter service qui permet de convertir un User en UserDto (et inversement)
     */
    constructor(
        private readonly userService: UserService,
        private readonly userDtoConverter: UserDtoConverter
    ) {}

    /**
     * Méthode GET sur la route /api/doctor/patients
     * Cette route permet de récupérer tous les patients d'un médecin à partir de son token de connexion
     * 
     * @UseGuards annotation qui permet d'ajouter un gardien à une route. 
     * AuthGuard permet de créer un gardien d'authentification à partir d'une Strategy Nest, ici 'auth'.
     * (Celui définit par la stratégie jwt cf. /auth/strategy/jwt.strategy.ts)
     * 
     * 
     * @param req objet qui fait référence à la requête
     * On utilise cet objet parce qu'on a affecté un gardien d'authentification à cette route.
     * Ce gardien est un gardien issue de la stratégie JWT, il remonte dans la requête l'utilisateur correspondant au token.
     * Le champ req.user contient le retour de la méthode validate() définit dans /auth/strategy/jwt.strategy.ts
     * 
     * @returns {UserDto[]} le tableau qui contient les patients du docteur connecté
     */
    @UseGuards(AuthGuard('auth'))
    @Get('/patients')
    @ApiResponse({ status: 201, description: 'Doctor patients', type: UserDto, isArray: true})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    @ApiResponse({ status: 404, description: 'User not found'})
    async addDoctor(
        @Request() req,
    ): Promise<UserDto[]> {
        //Récupère tous les patients d'un utilisateur à partir de son id
        const patients: User[] = await this.userService.getAllDoctorPatients(req.user.id);

        //On retourne le tableau de User convertis en tableau de UserDto
        return this.userDtoConverter.convertOutboundCollection(patients);
    }

}
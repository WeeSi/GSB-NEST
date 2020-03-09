import { CreateUserDto } from '../model/createUser.dto';
import { User } from '../user.entity';
import { Converter } from '../../common/converter';
import { RoleEnum } from '../../common/role.enum';
import { GenderEnum } from '../../common/gender.enum';

export class CreateUserDtoConverter implements Converter<CreateUserDto, Partial<User>>{

    // tslint:disable-next-line: no-empty
    constructor() {}

    convertInbound(user: CreateUserDto): Partial<User> {
        const userToCreate = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            image:user.image,
            role: RoleEnum[user.role],
            gender: GenderEnum[user.gender],
            password: user.password,
        }

        if (user.role === RoleEnum[RoleEnum.Commercial]) {
            userToCreate['doctors'] = [];
        }

        return userToCreate;
    }
}
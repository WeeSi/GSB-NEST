  
import { CreateUserDto } from '../model/createUser.dto';
import { User } from '../user.entity';
import { Converter } from '../../common/converter';
import { RoleEnum } from '../../common/role.enum';
import { GenderEnum } from '../../common/gender.enum';

export class CreateUserDtoConverter implements Converter<CreateUserDto, Partial<User>> {

    constructor() {}

    convertInbound(user: CreateUserDto): Partial<User> {
        return {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            role: RoleEnum[user.role],
            gender: GenderEnum[user.gender],
            password: user.password,
            image:user.image,
            medicines: [],
        };
    }
}
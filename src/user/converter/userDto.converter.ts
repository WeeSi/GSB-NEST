import { UserDto } from '../model/user.dto';
import { User } from '../user.entity';
import { Converter } from '../../common/converter';
import { RoleEnum } from '../../common/role.enum';
import { GenderEnum } from '../../common/gender.enum';

export class UserDtoConverter implements Converter<UserDto, User>{
    // tslint:disable-next-line: no-empty
    constructor() {}

    convertOutbound(user: User): UserDto {
        const userDto: UserDto = {
            id: user.id,
            address: user.address,
            email: user.email,
            image:user.image,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: GenderEnum[user.gender],
            role: RoleEnum[user.role],
        };

        if (user.role === RoleEnum.Commercial) {
            userDto['doctors'] = user.doctors.map(d => d.id);
        }

        return userDto;
    }

    convertOutboundCollection(users: User[]): UserDto[] {
        return users.map((user) => this.convertOutbound(user));
    }
}

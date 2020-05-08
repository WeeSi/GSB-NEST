import { Converter } from 'src/common/converter';
import { UpdateUserDto } from '../model/updateUser.dto';
import { User } from '../user.entity';

export class UpdateUserDtoConverter implements Converter<UpdateUserDto, Partial<User>> {
    constructor() {}

    convertInbound(user: UpdateUserDto): Partial<User> {
        return user as Partial<User>;
    }
}
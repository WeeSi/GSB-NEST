import { Converter } from 'src/common/converter';
import { UpdateUserDto } from '../model/updateUser.Dto';
import { User } from '../user.entity';

export class UpdateUserDtoConverter implements Converter<UpdateUserDto, Partial<User>>{
    // tslint:disable-next-line: no-empty
    constructor() {}

    convertInbound(user: UpdateUserDto): Partial<User> {
        return user as Partial<User>;
    }
}
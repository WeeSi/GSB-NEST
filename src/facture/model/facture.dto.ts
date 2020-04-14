import { IsNumber, IsString, IsBoolean, IsJSON } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { UserDto } from 'src/user/model/user.dto';

// tslint:disable-next-line: class-name
export class FactureDto {

    @ApiModelProperty()
    @IsNumber()
    id: number;

    @ApiModelProperty()
    @IsJSON()
    orders: number;

    @ApiModelProperty()
    @IsString()
    date: string;

    @ApiModelProperty({type: UserDto})
    @IsNumber()
    doctor: Partial<UserDto>;

    @ApiModelProperty({type: UserDto})
    @IsNumber()
    commercialId: Partial<UserDto>;
}
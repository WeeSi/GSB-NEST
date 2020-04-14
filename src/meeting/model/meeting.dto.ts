import { MeetingState } from './state.enum';
import { UserDto } from './../../user/model/user.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsJSON, IsString } from 'class-validator';

export class MeetingDto {
    @ApiModelProperty()
    @IsNumber()
    id: number;

    @ApiModelProperty({type: UserDto})
    @IsJSON()
    attendee: Partial<UserDto>;

    @ApiModelProperty({type: UserDto})
    @IsJSON()
    organizer: Partial<UserDto>;

    @ApiModelProperty({type: Number})
    @IsNumber()
    date: number;

    @ApiModelProperty({enum: Object.keys(MeetingState).filter((v) => isNaN(+v))})
    @IsString()
    state: string;

    @ApiModelProperty({type: String})
    @IsString()
    hours: string;

}
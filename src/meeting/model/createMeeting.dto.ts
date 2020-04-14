import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateMeetingDto {
    @ApiModelProperty()
    @IsNumber()
    attendee: number;

    @ApiModelProperty()
    @IsNumber()
    organizer: number;

    @ApiModelProperty({type: Number})
    @IsNumber()
    date: number;

    @ApiModelProperty({type: String})
    @IsString()
    hours: string;
}
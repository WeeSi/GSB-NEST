import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateMeetingDto {
    @ApiModelProperty({required: false})
    @IsEmail()
    @IsOptional()
    attendee?:number;

    @ApiModelProperty({required: false})
    @IsString()
    @IsOptional()
    organizer?:number;

    @ApiModelProperty({required: false})
    @IsString()
    @IsOptional()
    state?:number;

    @ApiModelProperty({required: false})
    @IsString()
    @IsOptional()
    date?:number;
}
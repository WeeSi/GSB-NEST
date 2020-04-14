  
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class HoursDto {
    @ApiModelProperty({type: String})
    @IsString()
    hours: string;
}
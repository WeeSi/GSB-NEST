import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreatOrderDto {

    @ApiModelProperty()
    @IsNumber()
    medicine:number;

    @ApiModelProperty()
    @IsNumber()
    quantity: number;
    
}
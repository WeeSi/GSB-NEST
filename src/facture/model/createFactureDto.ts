import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateFactureDto {

    @ApiModelProperty()
    @IsNumber()
    doctor:number;

    @ApiModelProperty()
    @IsString()
    date: string;

    @ApiModelProperty()
    @IsNumber()
    orders:number;

    @ApiModelProperty()
    @IsNumber()
    commercialId: number;
    
}
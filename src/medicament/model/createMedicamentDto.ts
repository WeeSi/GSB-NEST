import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateMedicamentDto {

    @ApiModelProperty()
    @IsString()
    nom: string;

    @ApiModelProperty()
    @IsString()
    description: string;

    @ApiModelProperty()
    @IsString()
    img: string;
}
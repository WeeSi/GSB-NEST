import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateFactureDto {

    @ApiModelProperty()
    @IsNumber()
    prix_repas: number;

    @ApiModelProperty()
    @IsNumber()
    prix_hotel: number;

    @ApiModelProperty()
    @IsNumber()
    prix_transport: number;

    @ApiModelProperty()
    @IsNumber()
    nombre_kilometre: number;

    @ApiModelProperty()
    @IsString()
    date: string;

    @ApiModelProperty()
    @IsString()
    description: string;
    
}
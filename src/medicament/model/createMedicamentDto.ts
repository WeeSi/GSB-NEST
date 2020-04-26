import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, IsNumber, IsNumberString } from 'class-validator';

export class CreateMedicamentDto {

    @ApiModelProperty()
    @IsString()
    nom: string;

    @ApiModelProperty()
    @IsString()
    description: string;

    @ApiModelProperty()
    @IsNumber()
    prix: number;

    @ApiModelProperty()
    @IsString()
    categorie: string;

    @ApiModelProperty()
    @IsString()
    img: string;

    @ApiModelProperty()
    @IsNumber()
    commercialID: number;

}
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEmail, IsNumberString } from 'class-validator';

export class MedicamentDto {

    @ApiModelProperty()
    @IsNumber()
    id: number;

    @ApiModelProperty()
    @IsString()
    nom: string;

    @ApiModelProperty()
    @IsString()
    description: string;

    @ApiModelProperty()
    @IsString()
    categorie: string;

    @ApiModelProperty()
    @IsString()
    img: string;

    @ApiModelProperty()
    @IsNumber()
    prix: number;

}


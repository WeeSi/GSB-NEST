import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEmail, IsNumberString } from 'class-validator';

export class CategorieDto {

    @ApiModelProperty()
    @IsNumber()
    id: number;

    @ApiModelProperty()
    @IsString()
    categorie: string;

}
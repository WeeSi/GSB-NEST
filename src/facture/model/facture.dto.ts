import { IsNumber, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

// tslint:disable-next-line: class-name
export class FactureDto {

    @ApiModelProperty()
    @IsNumber()
    id: number;

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

    // @ApiModelProperty
    // @IsNumber()
    // doctorId = '';
}
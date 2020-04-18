import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumberString, IsNumber } from 'class-validator';

export class UpdateMedicamentDto {
    @ApiModelProperty({required: false})
    @IsNumber()
    @IsOptional()
    prix?: number;

    @ApiModelProperty({required: false})
    @IsString()
    @IsOptional()
    description?: string;

    @ApiModelProperty({required: false})
    @IsString()
    @IsOptional()
    categorie?: string;

    @ApiModelProperty({required: false})
    @IsString()
    @IsOptional()
    nom?: string;

    @ApiModelProperty({required: false})
    @IsString()
    @IsOptional()
    image?: string;
}
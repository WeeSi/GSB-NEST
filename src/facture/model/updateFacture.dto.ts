import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumberString, IsNumber, IsBoolean } from 'class-validator';

export class UpdateFactureDto {

    @ApiModelProperty({required: false})
    @IsNumber()
    @IsOptional()
    doctor: number;

    @ApiModelProperty({required: false})
    @IsString()
    @IsOptional()
    date? = '';

    @ApiModelProperty({required: false})
    @IsNumber()
    @IsOptional()
    commercialId: number;
}
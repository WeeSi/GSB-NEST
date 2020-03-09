import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateUserDto {
    @ApiModelProperty({required: false})
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiModelProperty({required: false})
    @IsString()
    @IsOptional()
    password?: string;

    @ApiModelProperty({required: false})
    @IsString()
    @IsOptional()
    firstName?: string;

    @ApiModelProperty({required: false})
    @IsString()
    @IsOptional()
    lastName?: string;

    @ApiModelProperty({required: false})
    @IsString()
    @IsOptional()
    address?: string;

    @ApiModelProperty()
    @IsString()
    image?: string;
}
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreatOrderDto {

    @ApiModelProperty()
    @IsNumber()
    medicineNumber:number;

    @ApiModelProperty()
    @IsString()
    medicineName:string;

    @ApiModelProperty()
    @IsString()
    medicineImg:string;

    @ApiModelProperty()
    @IsNumber()
    medicinePrice:number;

    @ApiModelProperty()
    @IsString()
    medicineCategorie:string;

    @ApiModelProperty()
    @IsNumber()
    userOrder:number;

    @ApiModelProperty()
    @IsNumber()
    quantity: number;
    
}
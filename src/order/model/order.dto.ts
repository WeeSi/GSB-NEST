import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsString} from 'class-validator';

export class OrderDto {

    @ApiModelProperty()
    @IsNumber()
    id: number;

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


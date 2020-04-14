import { ApiModelProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class PaginatedDto<T> {
    @ApiModelProperty()
    @IsArray()
    elements: T[];

    @ApiModelProperty()
    @IsNumber()
    nbElements: number;
}
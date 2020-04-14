import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsJSON} from 'class-validator';
import { MedicamentDto } from 'src/medicament/model/medicament.dto';

export class OrderDto {

    @ApiModelProperty()
    @IsNumber()
    id: number;

    @ApiModelProperty({type: MedicamentDto})
    @IsJSON()
    medicine: Partial<MedicamentDto>;

    @ApiModelProperty()
    @IsNumber()
    quantity: number;

}


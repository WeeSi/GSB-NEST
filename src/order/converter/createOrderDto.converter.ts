
import { Converter } from '../../common/converter';
import { CreatOrderDto } from '../model/createOrder.dto';
import { Order } from '../order.entity';

export class CreateOrderDtoConverter implements Converter<CreatOrderDto, Partial<Order>>{

    // tslint:disable-next-line: no-empty
    constructor() {}

    convertInbound(order: CreatOrderDto): Partial<Order> {
        const OorderToCreate = {
                medicine : order.medicine,
                quantity : order.quantity
        }

        return OorderToCreate;
    }
}
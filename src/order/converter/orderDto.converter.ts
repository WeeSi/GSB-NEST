import { UserDto } from 'src/user/model/user.dto';
import { Converter } from '../../common/converter';
import { OrderDto } from '../model/order.dto';
import { Order } from '../order.entity';
import { Medicament } from 'src/medicament/medicament.entity';

export class OrderDtoConverter implements Converter<OrderDto, Order> {

    constructor() {}

    convertInbound(order: OrderDto): Order {
        return {
            id : order.id,
            quantity : order.quantity,
            medicine : order.medicine.id
        };
    }

    convertOutbound(order: Order): OrderDto {
        return {
            id : order.id,
            quantity : order.quantity,
            medicine : order.medicine as Partial<Medicament>
        };
    }

    convertOutboundCollection(order: Order[]): OrderDto[] {
        return order.map((m) => this.convertOutbound(m));
    }
}
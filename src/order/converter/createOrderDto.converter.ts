
import { Converter } from '../../common/converter';
import { CreatOrderDto } from '../model/createOrder.dto';
import { Order } from '../order.entity';

export class CreateOrderDtoConverter implements Converter<CreatOrderDto, Partial<Order>>{

    // tslint:disable-next-line: no-empty
    constructor() {}

    convertInbound(order: CreatOrderDto): Partial<Order> {
       return {
                medicineNumber : order.medicineNumber,
                medicinePrice : order.medicinePrice,
                medicineName : order.medicineName,
                medicineImg : order.medicineImg,
                medicineCategorie : order.medicineCategorie,
                userOrder : order.userOrder,
                quantity : order.quantity
        }
    }
}
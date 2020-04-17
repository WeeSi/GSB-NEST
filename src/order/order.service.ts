import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class OrderSerivce {

    constructor(@InjectRepository(Order) private orderRepository: Repository<Order>) { }

    async createOrder(orderToCreate : Partial<Order>):Promise <Order>{
        const createdOrder: Order = this.orderRepository.create(orderToCreate);
        return this.orderRepository.save(createdOrder);
    }

    async getUserOrder(userId : number):Promise <Order[]>{
        return this.orderRepository.find({
            where : [{id : userId}]
        });
    }
}
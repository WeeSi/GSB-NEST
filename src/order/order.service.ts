import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class OrderSerivce {

    constructor(@InjectRepository(Order) private factureRepository: Repository<Order>) { }

}

import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiImplicitBody, ApiImplicitParam, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Order } from './order.entity';
import { OrderSerivce } from './order.service';
import { OrderDto } from './model/order.dto';
import { OrderDtoConverter } from './converter/orderDto.converter';
import { CreatOrderDto } from './model/createOrder.dto';
import { CreateOrderDtoConverter } from './converter/createOrderDto.converter';

@ApiUseTags('orders')
@Controller('orders')
export class OrderController {

    constructor( private readonly service: OrderSerivce,
                 // tslint:disable-next-line: no-shadowed-variable
                 private readonly FactureDtoConverter: OrderDtoConverter,
                 // tslint:disable-next-line: no-shadowed-variable
                 private readonly createFactureDtoConverter: CreateOrderDtoConverter,
               ) {}

   

}

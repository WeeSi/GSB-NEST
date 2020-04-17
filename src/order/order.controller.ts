import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiImplicitBody, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Order } from './order.entity';
import { OrderSerivce } from './order.service';
import { OrderDto } from './model/order.dto';
import { OrderDtoConverter } from './converter/orderDto.converter';
import { CreatOrderDto } from './model/createOrder.dto';
import { CreateOrderDtoConverter } from './converter/createOrderDto.converter';

@ApiUseTags('order')
@Controller('order')
export class OrderController {

    constructor( private readonly service: OrderSerivce,
                 // tslint:disable-next-line: no-shadowed-variable
                 private readonly orderDtoConverter: OrderDtoConverter,
                 // tslint:disable-next-line: no-shadowed-variable
                 private readonly createOrderDtoConverter: CreateOrderDtoConverter,
               ) {

               }
               @UseGuards(AuthGuard('auth'))
               @Get(':id')
               @ApiResponse({ status: 201, description: 'User meetings', type: OrderDto, isArray: true})
               @ApiResponse({ status: 401, description: 'User not authentificated'})
               async meetings(@Param('id', ParseIntPipe) userId: number): Promise<OrderDto[]> {
                   const userOrder: Order[] = await this.service.getUserOrder(userId);
                   return this.orderDtoConverter.convertOutboundCollection(userOrder);
               }

               @UseGuards(AuthGuard('auth'))
               @Put()
               @ApiImplicitBody({name: 'CreatOrderDto', description: 'Order to create', type: CreatOrderDto})
               @ApiResponse({ status: 201, description: 'User found', type: Order})
               @ApiResponse({ status: 401, description: 'User not authentificated'})
               async create(@Body() order: CreatOrderDto): Promise<OrderDto> {
                   const OrderToCreate: Partial<Order> = this.createOrderDtoConverter.convertInbound(order);
                   const createdMeeting: Order = await this.service.createOrder(OrderToCreate);
                   return this.orderDtoConverter.convertOutbound(createdMeeting);
               }

}

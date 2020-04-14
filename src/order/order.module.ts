import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderSerivce } from './order.service';
import { OrderDtoConverter } from './converter/orderDto.converter';
import { Order } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateOrderDtoConverter } from './converter/createOrderDto.converter';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    OrderSerivce,
    OrderDtoConverter,
    CreateOrderDtoConverter,
],
exports: [
    OrderSerivce,
    OrderDtoConverter,
    CreateOrderDtoConverter,
  ],
})
export class OrderModule {}

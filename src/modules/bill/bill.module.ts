import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from 'src/entities/order.entity';
import { OrderModule } from '../order/order.module';
import { ProductModule } from '../products/product.module';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetail]),
    OrderModule,
    ProductModule,
  ],
  providers: [BillService],
  controllers: [BillController],
})
export class BillModule {}

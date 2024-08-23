import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { OrderDetail } from './order.entity';
import { Product } from './product.entity';
import { Service } from './service.entity';

@Entity({ name: 'order_items' })
export class OrderItem {
  @PrimaryGeneratedColumn()
  item_id: number;

  @Column()
  category_id: number;

  @Column()
  product_id: number;

  @Column()
  service_id: number;

  @ManyToOne(() => OrderDetail, (orderDetail) => orderDetail.items)
  order: OrderDetail;

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Product, { nullable: true })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Service, { nullable: true })
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @Column({ type: 'decimal' })
  price: number;
}

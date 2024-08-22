import { IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserAddress } from './address.entity';
import { BaseEntity } from './base.entity';
import { Category } from './category.entity';
import { Product } from './product.entity';
import { Service } from './service.entity';

@Entity({ name: 'orders' })
export class OrderDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column()
  category_id: number;

  @Column()
  product_id: number;

  @Column()
  service_id: number;

  @Column()
  price: number;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  description?: string;

  @Column({ type: 'varchar', nullable: true })
  @IsOptional()
  coupon_code: string;

  @Column({ nullable: true })
  @IsOptional()
  express_delivery_charges?: number;

  @Column({ type: 'decimal' })
  sub_total: number;

  @Column({ type: 'decimal' })
  shipping_charge: number;

  @Column({ type: 'decimal' })
  total: number;

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Product, { nullable: true })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Service, { nullable: true })
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @ManyToOne(() => UserAddress)
  @JoinColumn({ name: 'address_id' })
  address: UserAddress;

  @Column()
  address_id: number;
  items: any;
}

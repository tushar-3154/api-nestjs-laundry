import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Cart } from './cart.entity';
import { Category } from './category.entity';
import { Product } from './product.entity';
import { Service } from './service.entity';

@Entity('prices')
export class Price extends BaseEntity {
  @PrimaryGeneratedColumn()
  price_id: number;

  @Column()
  category_id: number;

  @Column()
  product_id: number;

  @Column()
  service_id: number;

  @ManyToOne(() => Category, { nullable: false })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Service, { nullable: false })
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @Column({ nullable: true })
  price: number;

  @OneToMany(() => Cart, (cart) => cart.price)
  carts: Cart[];
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CartItem } from './cart-items.entity';

@Entity({ name: 'services' })
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  service_id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.service)
  cartItems: CartItem[];
}

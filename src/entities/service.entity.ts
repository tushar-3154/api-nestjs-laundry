import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Carts } from './cart.entity';

@Entity({ name: 'services' })
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  service_id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @OneToMany(() => Carts, (carts) => carts.service)
  carts: Carts[];
}

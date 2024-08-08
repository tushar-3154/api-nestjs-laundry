import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'services' })
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  service_id: number;

  @Column()
  name: string;

  @Column()
  image: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('banners')
export class Banner extends BaseEntity {
  @PrimaryGeneratedColumn()
  banner_id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;
}

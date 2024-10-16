import { BannerType } from 'src/enum/banner_type.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('banners')
export class Banner extends BaseEntity {
  @PrimaryGeneratedColumn()
  banner_id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  image: string;

  @Column({ type: 'int', nullable: true })
  banner_type: BannerType;
}

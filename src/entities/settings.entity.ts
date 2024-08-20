import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'settings' })
export class Setting extends BaseEntity {
  @PrimaryGeneratedColumn()
  setting_id: number;

  @Column()
  key: string;

  @Column()
  value: string;
  setting: any;
}

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'device_users' })
export class DeviceUser {
  @PrimaryGeneratedColumn()
  device_id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column()
  device_type: string;

  @Column()
  device_token: string;

  @ManyToOne(() => User, (user) => user.deviceUsers)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
